<template>
  <div class="mt-6">
    <div class="flex items-center gap-2 mb-3">
      <span class="text-sm font-medium text-gray-700">
        {{ module.title }}
      </span>
      <span class="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
        {{ module.resources.length }}
      </span>
    </div>

    <div class="space-y-3">
      <ResourceItem
        v-for="resource in module.resources"
        :key="resource.id"
        :resource="resource"
        :formation-id="formationId"
        :module-id="module.id"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Module } from "../../types/formation";
import ResourceItem from "./ResourceItem.vue";

defineProps<{
  module: Module;
  formationId: number;
}>();
</script>
