<template>
  <header class="px-2 py-2 flex items-center">
    <nav-menu />
    <button class="text-left flex items-center space-x-2 ml-auto">
      <avatar v-if="user.email" :email="user.email" />
    </button>
  </header>
  <div class="fixed bottom-0 left-0 right-0">
    <div class="flex space-x-1 px-1 items-center justify-center overflow-hidden -space-x-1">
      <active-user-badge v-for="(baseUser, uid) in users" :key="uid" :user="baseUser" />
    </div>
    <div class="text-center text-sm">
      {{ usersCount }} active users
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from 'firebase/auth'
import { useActiveUsers } from '~/composables'

defineProps<{
  user: User
}>()
const users = useActiveUsers()

const usersCount = computed(() => Object.keys(users.value).length)
</script>
