<template>
  <div
    :class="[
      'rounded-xl shadow-card mb-6 overflow-hidden border border-gray-200',
      formation.title === 'Marketing Digital'
        ? 'bg-formationPurple'
        : 'bg-formationBlue',
    ]"
  >
    <!-- Header Formation -->
    <div
      class="flex items-center justify-between px-6 py-4 cursor-pointer"
      @click="toggleOpen"
    >
      <div class="flex items-center gap-3">
        <div
          :class="[
            'w-9 h-9 rounded-lg flex items-center justify-center',
            formation.title === 'Marketing Digital'
              ? 'bg-purple-200 text-purple-500'
              : 'bg-blue-100 text-primary',
          ]"
        >
          <FolderIcon class="size-5"></FolderIcon>
        </div>

        <div>
          <h2 class="font-bold text-gray-800 text-sm">
            {{ formation.title }}
          </h2>
          <p class="text-xs text-gray-500 mt-1">
            {{ formation.modules.length }} module{{
              formation.modules.length > 1 ? "s" : null
            }}
            • {{ totalResources }} ressource{{
              formation.modules.length > 1 ? "s" : null
            }}
          </p>
        </div>
      </div>

      <span
        class="text-gray-500 transition-transform"
        :class="{ 'rotate-180': isOpen }"
      >
        ⌄
      </span>
    </div>

    <!-- Modules -->
    <div v-show="isOpen" class="bg-white px-6 pb-6">
      <ModuleSection
        v-for="module in formation.modules"
        :key="module.id"
        :module="module"
        :formation-id="formation.id"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { Formation } from "../../types/formation";
import ModuleSection from "./ModuleSection.vue";
import { FolderIcon } from "@heroicons/vue/24/outline";

const props = defineProps<{
  formation: Formation;
}>();

const isOpen = ref(true);

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};

const totalResources = computed(() =>
  props.formation.modules.reduce((acc, m) => acc + m.resources.length, 0),
);
</script>
