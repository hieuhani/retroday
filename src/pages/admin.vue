<template>
  <div class="px-2">
    <div class="space-y-2">
      <h3>Confession sessions</h3>
      <div class="bg-white shadow overflow-hidden rounded-md">
        <ul role="list" class="divide-y divide-gray-200">
          <li v-for="(confession, id) in sessionConfessions" :key="id">
            <button class="hover:bg-gray-50 w-full px-4 py-4 flex items-center justify-between" @click="() => setActiveSessionConfession(id)">
              {{ confession.title }}
              <carbon-checkmark-filled v-if="activeConfessionSession === id" />
            </button>
          </li>
        </ul>
      </div>
      <button class="btn w-full rounded-md py-2" @click="addNewConfessionSession">
        New
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { push, serverTimestamp, set } from 'firebase/database'
import { useConfessionSessions, useActiveConfessionId, confessionSessionsRef, activeConfessionRef } from '~/composables'

const sessionConfessions = useConfessionSessions()
const activeConfessionSession = useActiveConfessionId()

function addNewConfessionSession() {
  const title = 'Session 2'
  push(confessionSessionsRef, {
    title,
    createdAt: serverTimestamp(),
  })
}

function setActiveSessionConfession(id: string) {
  set(activeConfessionRef, id)
}
</script>
