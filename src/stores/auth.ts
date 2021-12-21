import { acceptHMRUpdate, defineStore } from 'pinia'
import type { User } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<User | null>(null)

  function setCurrentUser(user: User | null) {
    currentUser.value = user
  }

  return {
    currentUser,
    setCurrentUser,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
