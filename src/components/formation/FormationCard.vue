<template>
  <div
    class="rounded-xl shadow-card mb-6 overflow-hidden border transition-all duration-200 border-gray-200"
  >
    <!-- Header Formation -->
    <div
      :class="[
        'flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-gray-50 transition',
        formation.modules.length > 1 ? 'bg-[#DBEAFE]' : 'bg-white',
      ]"
      @click="$emit('toggle')"
    >
      <div class="flex items-center gap-3">
        <div
          :class="[
            'w-9 h-9 rounded-lg flex items-center justify-center',
            formation.modules.length > 1
              ? 'bg-[#DBEAFE] text-primary'
              : 'bg-[#F3E8FF] text-[#9333EA]',
          ]"
        >
          <Folder :size="20" />
        </div>

        <div>
          <h2 class="font-bold text-[#111827] text-sm leading-[24px]">
            {{ formation.title }}
          </h2>
          <p class="text-xs text-[#6B7280] mt-1 font-normal leading-[20px]">
            {{ formation.modules.length }} module{{
              formation.modules.length > 1 ? "s" : ""
            }}
            •
            <span class="ml-3"
              >{{ totalResources }} ressource{{
                totalResources > 1 ? "s" : ""
              }}</span
            >
          </p>
        </div>
      </div>

      <span
        class="text-gray-500 transition-transform duration-300"
        :class="{ 'rotate-180': isOpen }"
      >
        <ChevronDown :size="16" />
      </span>
    </div>

    <!-- Modules (avec transition collapse) -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-300 ease-in"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-[2000px] opacity-100"
      leave-from-class="max-h-[2000px] opacity-100"
      leave-to-class="max-h-0 opacity-0"
    >
      <div v-show="isOpen" class="overflow-hidden">
        <div class="bg-white px-6 pb-6">
          <ModuleSection
            v-for="module in formation.modules"
            :key="module.id"
            :module="module"
            :formation-id="formation.id"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Formation } from "../../types/formation";
import ModuleSection from "./ModuleSection.vue";
import { Folder, ChevronDown } from "lucide-vue-next";

const props = defineProps<{
  formation: Formation;
  isOpen: boolean;
}>();

defineEmits<{
  toggle: [];
}>();

const totalResources = computed(() =>
  props.formation.modules.reduce((acc, m) => acc + m.resources.length, 0),
);
</script>
