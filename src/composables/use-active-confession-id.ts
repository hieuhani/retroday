import type { Unsubscribe } from 'firebase/database'
import { ref as firebaseRef, onValue } from 'firebase/database'
import { database } from '~/firebase'

export const activeConfessionRef = firebaseRef(database, 'confession/active')
export const useActiveConfessionId = () => {
  const unsubActiveConfessionRef = ref<Unsubscribe | undefined>()
  const activeConfessionSession = ref('')

  onMounted(() => {
    unsubActiveConfessionRef.value = onValue(activeConfessionRef, (snapshot) => {
      activeConfessionSession.value = snapshot.val()
    })
  })
  onUnmounted(() => {
    unsubActiveConfessionRef.value && unsubActiveConfessionRef.value()
  })
  return activeConfessionSession
}
