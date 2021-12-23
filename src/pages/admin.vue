<template>
  <div class="px-2">
    <div class="space-y-2">
      <h3 class="font-medium text-lg">
        Confession sessions
      </h3>
      <div class="bg-white shadow overflow-hidden rounded-md">
        <ul role="list" class="divide-y divide-gray-200">
          <li v-for="(confession, id) in sessionConfessions" :key="id" class="flex items-center px-4 py-4">
            <span class="mr-auto">
              {{ confession.title }}
            </span>
            <div class="space-y-2 w-40 flex-col flex">
              <button :class="['px-4 py-1 w-full rounded inline-block border', activeConfessionSession === id ? 'bg-red-500 text-white' : 'hover:bg-teal-600 hover:text-white']" @click="() => setActiveSessionConfession(id)">
                {{ activeConfessionSession === id ? 'Current active' : 'Set Active' }}
              </button>
              <button class="px-4 py-1 w-full rounded inline-block border" @click="() => shuffleConfessUsers(activeConfessionSession)">
                Shuffle
              </button>
            </div>
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
import { push, serverTimestamp, set, ref as firebaseRef } from 'firebase/database'
import { useConfessionSessions, useActiveConfessionId, confessionSessionsRef, activeConfessionRef, useActiveUsers } from '~/composables'
import { database } from '~/firebase'
import { shuffle } from '~/utils/array'

const sessionConfessions = useConfessionSessions()
const activeConfessionSession = useActiveConfessionId()
const users = useActiveUsers()

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

async function shuffleConfessUsers(id: string) {
  const a = shuffle(Object.keys(users.value))
  const size = a.length < 3 ? 1 : 3
  const b = [...a, ...a.slice(0, size)]

  const out: Record<string, string[]> = {}
  for (let i = 0; i < a.length; i += 1) {
    out[a[i]] = b.slice(i + 1, i + size + 1).reduce((prev, curr) => {
      return {
        [curr]: '',
        ...prev,
      }
    }, {})
  }

  const activeConfessionRef = firebaseRef(database, `confession/sessions/${id}/data`)
  await set(activeConfessionRef, out)
  console.log('done')
}
</script>
