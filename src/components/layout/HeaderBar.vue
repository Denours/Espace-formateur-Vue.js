<template>
  <header
    class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8"
  >
    <!-- Mobile toggle -->
    <button @click="toggleSidebar?.()" class="lg:hidden text-gray-600">
      ☰
    </button>

    <div class="flex-1">
      <h1 class="text-2xl font-semibold">Ressources Pédagogiques</h1>
    </div>

    <!-- Right section -->
    <div class="flex items-center gap-6">
      <!-- Notification -->
      <div class="relative">
        <div class="w-6 h-6">🔔</div>
        <span
          class="absolute -top-1 left-2 w-3 h-3 bg-red-500 rounded-full border-2 border-white"
        ></span>
      </div>

      <!-- Avatar -->
      <div
        class="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-primary font-semibold"
      >
        PR
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { inject } from "vue";

const toggleSidebar = inject<() => void>("toggleSidebar");
</script>
