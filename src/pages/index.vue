<template>
  <div class="px-2 space-y-4">
    <h3 class="font-lg font-medium text-center">
      A goodwill note for your colleges to say thanks and recommendations
    </h3>
    <div class="space-y-2">
      <div v-for="feedback in feedbacks" :key="feedback.uid" class="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
        <label v-if="users[feedback.uid]" :for="`feedback-for-${feedback.uid}`" class="w-full px-3 pt-3 pb-1 inline-flex">Dear <span class="font-medium ml-1">{{ users[feedback.uid].email }}</span></label>
        <label :for="`feedback-for-${feedback.uid}`" class="sr-only">Description</label>
        <textarea
          :id="`feedback-for-${feedback.uid}`"
          v-model="feedback.value"
          rows="3"
          name="description"
          class="block w-full border-0 px-3 pb-3 resize-none placeholder-gray-500 focus:ring-0 sm:text-sm"
          placeholder="Write a confession..."
        />
        <div class="px-2 py-1 space-x-1 items-center flex">
          <input :id="`feedback-for-${feedback.uid}-anonymously`" v-model="feedback.anonymous" type="checkbox" class="border-gray-300 rounded-lg text-red-500">
          <label :for="`feedback-for-${feedback.uid}-anonymously`" class="text-sm">Send anonymously</label>
        </div>
      </div>
    </div>
    <button class="btn w-full bg-red-500 py-2 flex justify-center items-center" :disabled="!isValid || loadingStatus === 'loading'" @click="send">
      Send with love
      <carbon-contour-finding v-if="loadingStatus === 'loading'" class="animate-spin ml-2" />
    </button>
  </div>
</template>

<script setup lang="ts">
import confetti from 'canvas-confetti'
import { set, ref as firebaseRef, push } from 'firebase/database'
import { useActiveConfessionId, useActiveUsers, useGetConfessionSession } from '~/composables'
import { useAuthStore } from '~/stores/auth'
import { database } from '~/firebase'

interface FeedbackInput {
  uid: string
  value: string
  anonymous: boolean
}
const activeConfessionSessionId = useActiveConfessionId()
const confessionSession = useGetConfessionSession(activeConfessionSessionId)
const auth = useAuthStore()
const users = useActiveUsers()
const feedbacks = ref<FeedbackInput[]>([])
const loadingStatus = ref('')
const isValid = computed(() => feedbacks.value.every(feedback => feedback.value))

watchEffect(() => {
  if (feedbacks.value.length === 0 && auth.currentUser && confessionSession.value && confessionSession.value.data && confessionSession.value.data[auth.currentUser.uid]) {
    const data = confessionSession.value.data[auth.currentUser.uid]
    feedbacks.value = Object.keys(data).map(uid => ({ uid, value: data[uid], anonymous: false }))
  }
})

async function send() {
  if (!auth.currentUser)
    throw new Error('Please sign in to send')

  loadingStatus.value = 'loading'
  const activeConfessionRef = firebaseRef(database, `confession/sessions/${activeConfessionSessionId.value}/data/${auth.currentUser.uid}`)

  const { userFeedbacks, anonymousFeedbacks } = feedbacks.value.reduce<{userFeedbacks: Record<string, string>; anonymousFeedbacks: Record<string, string>}>((prev, current) => {
    if (current.anonymous) {
      return {
        ...prev,
        anonymousFeedbacks: {
          [current.uid]: current.value,
          ...prev.anonymousFeedbacks,
        },
      }
    }
    return {
      ...prev,
      userFeedbacks: {
        [current.uid]: current.value,
        ...prev.userFeedbacks,
      },
    }
  }, {
    userFeedbacks: {},
    anonymousFeedbacks: {},
  })

  await set(activeConfessionRef, userFeedbacks)

  Object.keys(anonymousFeedbacks).forEach(async(uid) => {
    if (anonymousFeedbacks[uid]) {
      const anonymousRef = firebaseRef(database, `confession/sessions/${activeConfessionSessionId.value}/anonymous/${uid}`)
      await push(anonymousRef, anonymousFeedbacks[uid])
    }
  })
  confetti()
  loadingStatus.value = ''
}
</script>
