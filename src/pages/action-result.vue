<template>
  <div class="px-2 space-y-4">
    <div v-for="result in results" :key="result.id" class="py-2 ">
      <div class="p-2 text-center text-xl  bg-green-200 rounded-md mb-2 min-h-40 flex justify-center items-center" :title="result.uid && users[result.uid] ? users[result.uid].email : 'Anonymous'">
        {{ result.value }}
      </div>

      <div class="grid grid-cols-2 divide-x gap-2">
        <div class="text-center bg-gray-100 rounded-md py-1 items-center flex justify-center space-x-2">
          <span>{{ result.likeCount }}</span> <carbon-face-satisfied />
        </div>
        <div class="text-center bg-gray-100 rounded-md py-1 items-center flex justify-center space-x-2">
          <span>{{ result.nopeCount }}</span> <carbon-face-dissatisfied />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useActions, useActiveUsers } from '~/composables'
const actions = useActions()
const users = useActiveUsers()

const results = computed(() => Object.keys(actions.value).map((actionId) => {
  const action = actions.value[actionId]
  const votes = action.votes || {}
  const counter = Object.keys(votes).reduce((prev, current) => {
    const output = {
      ...prev,
    }
    if (votes[current] === 'like')
      output.likeCount = output.likeCount + 1
    else if (votes[current] === 'nope')
      output.nopeCount = output.nopeCount + 1

    return output
  }, {
    nopeCount: 0,
    likeCount: 0,
  })

  return {
    id: actionId,
    anonymous: action.anonymous,
    value: action.value,
    uid: action.uid,
    ...counter,
  }
}).sort((a, b) => (b.likeCount - b.nopeCount) - (a.likeCount - a.nopeCount)))

</script>
