<template>
  <header class="px-2 py-2 flex items-center">
    <nav-menu />
    <button class="text-left flex items-center space-x-2 ml-auto">
      <avatar v-if="user.email" :email="user.email" />
    </button>
  </header>
  <div class="fixed bottom-1 left-0 right-0">
    <div class="flex space-x-1 px-1 items-center justify-center overflow-hidden -space-x-1 overflow-y-auto">
      <active-user-badge v-for="(baseUser, uid) in displayUsers" :key="uid" :user="baseUser" />
      <div v-if="moreUsersCount > 0">
        <button class="bg-gray-500 text-white w-10 h-10 items-center justify-center flex text-sm inline-block rounded-full ring-2 ring-white" @click="openModal">
          +{{ moreUsersCount }}
        </button>
      </div>
    </div>
    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="closeModal">
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="min-h-screen px-4 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <DialogOverlay class="fixed inset-0 bg-gray-600 opacity-70" />
            </TransitionChild>

            <span class="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>

            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <div
                class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  Current signed users
                </DialogTitle>
                <div class="mt-2 space-y-2 max-h-40 overflow-y-auto">
                  <div v-for="(baseUser, uid) in users" :key="uid" class="flex items-center space-x-2">
                    <avatar :email="baseUser.email" />
                    <span>
                      {{ baseUser.email }}
                    </span>
                  </div>
                </div>

                <div class="mt-4">
                  <button
                    type="button"
                    class="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    @click="closeModal"
                  >
                    Got it, thanks!
                  </button>
                </div>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from '@headlessui/vue'
import type { User } from 'firebase/auth'
import { useActiveUsers } from '~/composables'

defineProps<{
  user: User
}>()
const isOpen = ref(false)
const users = useActiveUsers()
const maxUser = 2

const displayUsers = computed(() => Object.keys(users.value).slice(0, maxUser).map(uid => users.value[uid]))

const usersCount = computed(() => Object.keys(users.value).length)
const moreUsersCount = computed(() => usersCount.value - maxUser)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}
</script>
