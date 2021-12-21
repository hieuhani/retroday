<script setup lang="ts">
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import { ref, set, serverTimestamp } from 'firebase/database'
import { database } from './firebase'
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
onAuthStateChanged(getAuth(), (user) => {
  auth.setCurrentUser(user)
  if (user) {
    set(ref(database, `/users/${user.uid}`), {
      lastVisit: serverTimestamp(),
      email: user.email,
    })
  }
})

useHead({
  title: 'Retrocap',
  meta: [
    { name: 'description', content: 'Retrocap' },
  ],
})
</script>

<template>
  <router-view />
</template>
