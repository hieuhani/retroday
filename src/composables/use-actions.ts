import type { Unsubscribe } from 'firebase/database'
import { ref as firebaseRef, onValue } from 'firebase/database'
import { database } from '~/firebase'
import type { Action } from '~/types'

const activeActionsRef = firebaseRef(database, 'action/actions')

export const useActions = () => {
  const unsubRef = ref<Unsubscribe | undefined>()
  const users = ref<Record<string, Action>>({})

  onMounted(() => {
    unsubRef.value = onValue(activeActionsRef, (snapshot) => {
      users.value = snapshot.val()
    })
  })
  onUnmounted(() => {
    unsubRef.value && unsubRef.value()
  })
  return users
}
