<template>
  <header
    class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8"
  >
    <!-- Mobile toggle -->
    <button
      @click="$emit('toggleSidebar')"
      class="text-gray-600 hover:text-primary transition lg:hidden"
    >
      ☰
    </button>

    <div class="flex-1 ml-2">
      <h1 class="text-xl font-semibold leading-[28px]">Ressources Pédagogiques</h1>
    </div>
    <!-- Right section -->
    <div class="flex items-center gap-6">
      <!-- Notification -->
      <div class="relative">
        <div class="w-6 h-6"><BellIcon></BellIcon></div>
        <span
          class="absolute -top-1 left-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white"
        ></span>
      </div>
      <!-- Avatar -->
      <div
        class="avatar w-9 h-9 rounded-full bg-blue-200 flex items-center justify-center text-primary font-semibold"
      >
        PR
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { BellIcon } from "@heroicons/vue/24/outline";

defineEmits(["toggleSidebar"]);
</script>
<style scoped>
.avatar {
  font-size: small;
}
</style>
