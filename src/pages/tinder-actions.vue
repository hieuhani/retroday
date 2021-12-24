<template>
  <div class="px-2">
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
import { useActions, useActiveUsers } from '~/composables'
import { useAuthStore } from '~/stores/auth'

const users = useActiveUsers()

const auth = useAuthStore()
const actions = useActions()
</script>
