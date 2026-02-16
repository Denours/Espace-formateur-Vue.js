<template>
  <div
    :class="[
      'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition',
      active
        ? 'bg-sidebarActive text-primary'
        : 'text-gray-600 hover:bg-gray-100',
    ]"
  >
    <div class="w-5 h-5"><slot></slot></div>
    <span>{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  active?: boolean;
}>();
</script>
