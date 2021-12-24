<template>
  <div class="px-2">
    <div class="mb-4 border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
      <label for="action-description" class="sr-only">Description</label>
      <textarea
        id="action-description"
        v-model="actionForm.value"
        rows="3"
        name="description"
        class="block w-full border-0 px-3 py-3 resize-none placeholder-gray-500 focus:ring-0 sm:text-sm"
        placeholder="Submit your idea or action to vote..."
      />
      <div class="px-2 py-1 flex justify-between">
        <div class="items-center flex space-x-1">
          <input id="send-anonymous" v-model="actionForm.anonymous" type="checkbox" class="border-gray-300 rounded-lg text-red-500">
          <label for="send-anonymous" class="text-sm">Send anonymously</label>
        </div>
        <button class="btn py-2 flex items-center" :disabled="!isValid || loadingStatus === 'loading'" @click="submit">
          Submit
          <carbon-contour-finding v-if="loadingStatus === 'loading'" class="animate-spin ml-2" />
        </button>
      </div>
    </div>
    <div class="space-y-3">
      <div v-for="(action, randomId) in actions" :key="randomId" class="rounded py-2 px-2 rounded-lg bg-red-100 shadow-sm">
        {{ action.value }}
        <div v-if="action.uid">
          <h3 class="text-xs font-medium text-right text-red-700">
            {{ users[action.uid] ? users[action.uid].email : 'Anonymous' }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref as firebaseRef, push } from 'firebase/database'
import { useActions, useActiveUsers } from '~/composables'
import { database } from '~/firebase'
import { useAuthStore } from '~/stores/auth'

const users = useActiveUsers()

interface ActionInput {
  value: string
  anonymous: boolean
}

const auth = useAuthStore()
const actions = useActions()
const loadingStatus = ref('')
const actionForm = ref<ActionInput>({
  value: '',
  anonymous: false,
})

const activeActionsRef = firebaseRef(database, 'action/actions')
const isValid = computed(() => actionForm.value.value)

async function submit() {
  loadingStatus.value = 'loading'
  await push(activeActionsRef, {
    ...actionForm.value,
    uid: actionForm.value.anonymous ? null : auth.currentUser?.uid,
  })
  actionForm.value = { value: '', anonymous: false }
  loadingStatus.value = ''
}
</script>
