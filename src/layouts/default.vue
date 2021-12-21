<script setup lang="ts">
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth'

import { useAuthStore } from '~/stores/auth'
const auth = useAuthStore()

async function handleAuthenticated(href: string) {
  if (isSignInWithEmailLink(getAuth(), window.location.href)) {
  // Additional state parameters can also be passed via URL.
  // This can be used to continue the user's intended action before triggering
  // the sign-in operation.
  // Get the email if available. This should be available if the user completes
  // the flow on the same device where they started it.
    let email = window.localStorage.getItem('emailForSignIn')
    if (!email) {
    // User opened the link on a different device. To prevent session fixation
    // attacks, ask the user to provide the associated email again. For example:
      email = window.prompt('Please provide your email for confirmation')
    }
    if (!email)
      // TODO: show error
      return

    // The client SDK will parse the code from the link for you.
    try {
      const result = await signInWithEmailLink(getAuth(), email, window.location.href)
      // You can access the new user via result.user
      // Additional user info profile not available via:
      // result.additionalUserInfo.profile == null
      // You can check if the user is new or existing:
      // result.additionalUserInfo.isNewUser
      auth.setCurrentUser(result.user)

      // Clear email from storage.
      window.localStorage.removeItem('emailForSignIn')
    }
    catch (error: any) {
      // Some error occurred, you can inspect the code: error.code
      // Common errors could be invalid email and invalid or expired OTPs.
    }
  }
}
if (window.location.href.includes('apiKey='))
  handleAuthenticated(window.location.href)

</script>
<template>
  <main class="text-gray-700 dark:text-gray-200">
    <div v-if="auth.currentUser">
      <Header :user="auth.currentUser" />
      <router-view />
    </div>
    <div v-else>
      <sign-in />
    </div>

    <Footer />
    <div class="mt-5 mx-auto text-center opacity-25 text-sm">
      [Default Layout]
    </div>
  </main>
</template>
