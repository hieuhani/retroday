<template>
  <div class="px-2">
    <div v-if="allConfessions" class="space-y-3">
      <div v-for="(confessions, uid) in allConfessions" :key="uid">
        <div v-if="users[uid]" class="flex space-x-2 justify-start">
          <avatar :email="users[uid].email" />
          <div class="flex-1 space-y-1">
            <span class="text-sm font-medium">Dear {{ users[uid].email }},</span>

            <div class="space-y-2">
              <div v-if="confessions.length === 0">
                <div class="bg-red-100 w-full px-2 py-1 rounded-md space-y-2">
                  You are awesome, thanks for your contributions over the year!
                </div>
              </div>
              <div v-for="(confession, idx) in confessions" :key="`${uid}_${idx}`" else class="bg-red-100 w-full px-2 py-1 rounded-md space-y-2">
                <div>
                  {{ confession.message }}
                </div>
                <div>
                  <h3 class="text-xs font-medium text-right text-red-700">
                    {{ users[confession.from] ? users[confession.from].email : 'Anonymous' }}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script  setup lang="ts">import { useActiveConfessionId, useActiveUsers, useGetConfessionSession } from '~/composables'
const activeConfessionSessionId = useActiveConfessionId()
const confessionSession = useGetConfessionSession(activeConfessionSessionId)
const users = useActiveUsers()

interface Confession {
  message: string
  from: string
}
type AllConfessions = Record<string, Confession[]>
const allConfessions = computed(() => {
  if (!confessionSession.value)
    return null

  let usersConfessions: AllConfessions = {}
  if (confessionSession.value.anonymous) {
    const anonymousConfessions = confessionSession.value.anonymous || {}
    usersConfessions = Object.keys(anonymousConfessions).reduce<AllConfessions>((prev, current) => {
      return {
        ...prev,
        [current]: [...(prev[current] || []), ...Object.keys(anonymousConfessions[current] || {}).map(randomId => ({ message: anonymousConfessions[current][randomId], from: 'Anonymous' }))],
      }
    }, {})
  }
  if (confessionSession.value.data) {
    const userConfessions = confessionSession.value.data || {}
    Object.keys(userConfessions).forEach((fromUid) => {
      Object.keys(userConfessions[fromUid]).forEach((toUid) => {
        if (!usersConfessions[toUid])
          usersConfessions[toUid] = []

        if (userConfessions[fromUid][toUid]) {
          usersConfessions[toUid].push({
            message: userConfessions[fromUid][toUid],
            from: fromUid,
          })
        }
      })
    })
  }
  return usersConfessions
})

</script>
