<template>
  <div>
    <avatar :email="user.email" class="w-8 h-8 text-sm inline-block rounded-full ring-2 ring-white" />
  </div>
</template>

<script setup lang="ts">import type { BaseUser } from '~/types'

defineProps<{
  user: BaseUser
}>()
</script>
