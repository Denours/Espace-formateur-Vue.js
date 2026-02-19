<template>
  <div
    class="flex flex-col items-center justify-center h-full text-gray-400 py-32"
  >
    <component :is="icone" class="size-16" />
    <h2 class="text-xl font-semibold text-gray-600 mb-2">{{ titre }}</h2>
    <p class="text-sm">Cette section est en cours de développement.</p>
  </div>
</template>

<script setup lang="ts">
import type { Component } from "vue";

defineProps<{
  titre: string;
  icone: Component;
}>();
</script>
