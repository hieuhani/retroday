import type { Unsubscribe } from 'firebase/database'
import { ref as firebaseRef, onValue } from 'firebase/database'
import { database } from '~/firebase'
import type { BaseUser } from '~/types'

export const activeUsersRef = firebaseRef(database, 'users')

export const useActiveUsers = () => {
  const unsubRef = ref<Unsubscribe | undefined>()
  const users = ref<Record<string, BaseUser>>({})

  onMounted(() => {
    unsubRef.value = onValue(activeUsersRef, (snapshot) => {
      users.value = snapshot.val()
    })
  })
  onUnmounted(() => {
    unsubRef.value && unsubRef.value()
  })
  return users
}
