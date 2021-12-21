import type { Unsubscribe } from 'firebase/database'
import { ref as firebaseRef, onValue } from 'firebase/database'
import { database } from '~/firebase'
import type { SessionConfession } from '~/types'

export const confessionSessionsRef = firebaseRef(database, 'confession/sessions')

export const useConfessionSessions = () => {
  const unsubSessionConfessionsRef = ref<Unsubscribe | undefined>()
  const sessionConfessions = ref<Record<string, SessionConfession>>({})

  onMounted(() => {
    unsubSessionConfessionsRef.value = onValue(confessionSessionsRef, (snapshot) => {
      sessionConfessions.value = snapshot.val()
    })
  })
  onUnmounted(() => {
    unsubSessionConfessionsRef.value && unsubSessionConfessionsRef.value()
  })
  return sessionConfessions
}
