<template>
  <form class="space-y-2 mx-auto w-64" @submit.prevent="signIn">
    <input
      id="input"
      v-model="email"
      type="email"
      autocomplete="false"
      placeholder="Enter your @encapital.io"
      p="x-4 y-2"
      w="full"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
    >
    <label class="hidden" for="input">Email</label>
    <div>
      <button class="btn w-full" :disabled="!email || signInStatus === 'Loading'">
        Sign in
      </button>
      {{ signInStatus }}
    </div>
  </form>
</template>

<script setup lang="ts">
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth'
const auth = getAuth()
const signInStatus = ref('')
const email = ref('')

const actionCodeSettings = {
  url: 'http://localhost:3333',
  handleCodeInApp: true,
}

async function signIn() {
  try {
    signInStatus.value = 'Loading'
    sendSignInLinkToEmail(auth, email.value, actionCodeSettings)
    localStorage.setItem('emailForSignIn', email.value)
    signInStatus.value = 'Please open the link we sent to your email to continue'
  }
  catch (error: any) {
    signInStatus.value = error.message
    console.error(error)
  }
}
</script>
