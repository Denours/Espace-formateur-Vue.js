<template>
  <RouterLink :to="to" custom v-slot="{ isActive, navigate }">
    <div
      @click="navigate"
      :class="[
        'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition',
        isActive
          ? 'bg-blue-100 text-primary'
          : 'text-gray-700 hover:bg-gray-100',
      ]"
    >
      <div :class="['w-5 h-5', isActive ? 'text-primary' : 'text-[#9CA3AF]']">
        <slot></slot>
      </div>
      <span class="sidebartext">{{ label }}</span>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  to: string;
}>();
</script>
<style scoped>
.sidebartext {
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  vertical-align: middle;
  letter-spacing: 0%;
}
</style>
