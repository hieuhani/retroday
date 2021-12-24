<template>
  <div class="px-2">
    <div v-if="loadingStatus === 'done'" class="bg-red-200 text-center rounded-md py-4">
      <p>Your votes has been counted. Thank you!</p>
      <router-link to="/action-result" class="text-red-400 font-bold">
        Track the result here
      </router-link>
    </div>
    <Tinder
      v-else
      ref="tinder"
      v-model:queue="queue"
      key-name="id"
      :offset-y="10"
      allow-down
      @submit="onSubmit"
    >
      <template #default="{ data }">
        <div
          v-if="data.id"
          class="w-full h-full flex flex-col justify-center text-center flex items-center bg-gradient-to-br rounded-b-xl px-4 font-semibold text-white from-orange-400 to-pink-600"
        >
          <div class="text-white text-3xl select-none mb-2">
            {{ data.value }}
          </div>
          <div v-if="data.uid">
            <h3 class="font-medium text-red-700">
              {{ users[data.uid] ? users[data.uid].email : 'Anonymous' }}
            </h3>
          </div>
        </div>
      </template>
    </Tinder>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import Tinder from 'vue-tinder'
import { ref as firebaseRef, set } from 'firebase/database'
import { useActions, useActiveUsers } from '~/composables'
import { useAuthStore } from '~/stores/auth'
import { database } from '~/firebase'
import type { Action } from '~/types'

interface ActionWithId extends Action {
  id: string
}
interface TinderSubmit {
  type: 'nope' | 'like'
  key: string
}
const users = useActiveUsers()
const auth = useAuthStore()
const actions = useActions()
const queue = ref<ActionWithId[]>([])
const result = ref<TinderSubmit[]>([])
const loadingStatus = ref('')

watchEffect(() => {
  const values = Object.keys(actions.value).map(id => ({
    id,
    ...actions.value[id],
  }))
  queue.value = values
})

function onSubmit(data: TinderSubmit) {
  result.value.push(data)
  if (queue.value.length === 0) {
    loadingStatus.value = 'loading'
    result.value.forEach(async({ key, type }) => {
      const activeActionsRef = firebaseRef(database, `action/actions/${key}/votes/${auth.currentUser?.uid}`)
      await set(activeActionsRef, type)
    })
    loadingStatus.value = 'done'
  }
}
</script>

<style>
.vue-tinder {
  @apply absolute left-0 right-0 z-10 mx-auto;
  top: 60px;
  width: calc(100% - 20px);
  height: calc(100% - 23px - 65px - 47px - 16px);

}

.tinder-card {
    @apply shadow-md rounded-2xl overflow-hidden absolute w-full h-full
}
</style>
