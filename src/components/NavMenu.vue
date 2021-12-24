<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
        class="inline-flex justify-center w-full bg-red-200 rounded-md px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <carbon-menu class="text-gray-600 text-xl" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute z-1 left-0 w-56 mt-2 origin-top-right bg-white divide-y rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="px-1 py-1">
          <MenuItem v-slot="{ active }">
            <router-link
              to="/"
              :class="[
                active ? 'bg-red-500 text-white' : 'text-gray-600',
                'group flex rounded-md items-center w-full px-2 py-2 text-sm space-x-2',
              ]"
            >
              <carbon-chat class="w-6 h-6" />
              <span>Confessions</span>
            </router-link>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <router-link
              to="/actions"
              :class="[
                active ? 'bg-red-500 text-white' : 'text-gray-600',
                'group flex rounded-md items-center w-full px-2 py-2 text-sm space-x-2',
              ]"
            >
              <carbon-3d-mpr-toggle class="w-6 h-6" />
              <span>Actions</span>
            </router-link>
          </MenuItem>
          <MenuItem v-slot="{ active }">
            <router-link
              to="/tinder-actions"
              :class="[
                active ? 'bg-red-500 text-white' : 'text-gray-600',
                'group flex rounded-md items-center w-full px-2 py-2 text-sm space-x-2',
              ]"
            >
              <carbon-interactions class="w-6 h-6" />
              <span>Tinder Actions</span>
            </router-link>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
</script>
