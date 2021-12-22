<template>
  <div class="px-2">
    <div v-if="confessionSession">
      {{ confessionSession }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useActiveConfessionId, useGetConfessionSession } from '~/composables'

const activeConfessionSessionId = useActiveConfessionId()
const confessionSession = useGetConfessionSession(activeConfessionSessionId)

</script>
