<template>
  <div
    class="bg-gray-50 rounded-lg px-4 py-3 flex items-center justify-between border border-gray-200 hover:bg-gray-100 transition"
  >
    <!-- Left -->
    <div class="flex items-center gap-3">
      <div
        class="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-100 text-blue-600 text-sm font-bold"
      >
        {{ resource.type.charAt(0) }}
      </div>

      <div>
        <p class="text-sm font-medium text-gray-800">
          {{ resource.title }}
        </p>
        <p class="text-xs text-gray-500 mt-1">
          {{ resource.type }} • {{ resource.size }} • {{ resource.date }}
        </p>
      </div>
    </div>

    <!-- Right -->
    <div class="flex items-center gap-4 text-gray-500">
      <button class="hover:text-primary transition">✏️</button>
      <button class="hover:text-red-500 transition">🗑️</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Resource } from "../../types/formation";

defineProps<{
  resource: Resource;
}>();
</script>
