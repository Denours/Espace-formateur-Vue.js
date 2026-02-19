<template>
  <div class="mt-6">
    <div class="flex items-center gap-2 mb-3">
      <span class="text-[#3B82F6]">•</span>
      <span class="text-sm font-semibold text-[#111827]">
        {{ module.title }}
      </span>
      <span
        class="text-xs bg-[#F3F4F6] text-[#1F2937] px-2 py-0.5 rounded-full"
      >
        {{ module.resources.length }}
      </span>
    </div>

    <div class="space-y-3 border-l-2 border-[#F3F4F6] p-3">
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
