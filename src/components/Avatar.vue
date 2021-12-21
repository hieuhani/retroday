<template>
  <div class="bg-red-500 text-white w-10 h-10 items-center justify-center flex rounded-full">
    {{ initialName }}
  </div>
</template>

<script setup lang="ts">
import { getInitialFromEmail } from '~/utils/string'

const props = defineProps<{
  email: string
}>()
const initialName = computed(() => getInitialFromEmail(props.email))
</script>
