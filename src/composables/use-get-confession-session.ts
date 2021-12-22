import type { Unsubscribe } from 'firebase/database'
import { ref as firebaseRef, onValue } from 'firebase/database'
import type { Ref } from 'vue'
import type { SessionConfession } from '~/types'
import { database } from '~/firebase'

export const useGetConfessionSession = (id: Ref<string>) => {
  const unsubRef = ref<Unsubscribe | undefined>()
  const sessionConfession = ref<SessionConfession | undefined>()
  watchEffect(() => {
    unsubRef.value && unsubRef.value()

    const confessionSessionRef = firebaseRef(database, `confession/sessions/${id.value}`)
    unsubRef.value = onValue(confessionSessionRef, (snapshot) => {
      sessionConfession.value = snapshot.val()
    })
  })

  onUnmounted(() => {
    unsubRef.value && unsubRef.value()
  })
  return sessionConfession
}
