<template>
  <form class="space-y-2 mx-auto w-64 pt-4" @submit.prevent="signIn">
    <h2 class="text-center text-2xl mb-2">
      Retroday
    </h2>
    <input
      id="input"
      v-model="email"
      type="email"
      autocomplete="false"
      placeholder="username@encapital.io"
      p="x-4 y-2"
      w="full"
      text="center"
      bg="transparent"
      border="~ rounded gray-200"
      outline="none active:none"
    >
    <label class="hidden" for="input">Email</label>
    <div>
      <button class="btn w-full py-2" :disabled="!email || signInStatus === 'Loading'">
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
  url: 'https://retrocap-56992.web.app',
  handleCodeInApp: true,
}

async function signIn() {
  try {
    signInStatus.value = 'Loading'
    sendSignInLinkToEmail(auth, email.value, actionCodeSettings)
    localStorage.setItem('emailForSignIn', email.value)
    signInStatus.value = 'Please open the link we sent to your email to continue'
    email.value = ''
  }
  catch (error: any) {
    signInStatus.value = error.message
    console.error(error)
  }
}
</script>
