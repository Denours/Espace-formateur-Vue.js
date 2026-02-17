<template>
  <aside
    :class="[
      'bg-white w-64 border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 z-40 transform transition-transform duration-300',
      isOpen ? 'translate-x-0' : '-translate-x-full',
    ]"
  >
    <!-- Logo / titre -->
    <div class="flex items-center gap-3 px-6 py-5 border-b border-gray-200">
      <div
        class="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-semibold"
      >
        JM
      </div>
      <div>
        <p class="text-sm font-semibold">Espace</p>
        <p class="text-sm font-semibold">Formateur</p>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-4 py-6 space-y-1">
      <SidebarItem to="/tableau-de-bord" label="Tableau de bord"
        >🏚️</SidebarItem
      >
      <SidebarItem to="/sessions" label="Mes sessions">⏲️</SidebarItem>
      <SidebarItem to="/ressources" label="Ressources">📚</SidebarItem>
      <SidebarItem to="/messages" label="Messages">📩</SidebarItem>
      <SidebarItem to="/profil" label="Mon profil">🙍</SidebarItem>
    </nav>
  </aside>

  <!-- Overlay mobile -->
  <div
    v-if="isOpen"
    @click="$emit('close')"
    class="fixed inset-0 bg-black/30 z-30 lg:hidden"
  />
</template>

<script setup lang="ts">
import SidebarItem from "./SidebarItem.vue";
defineProps<{ isOpen: boolean }>();
defineEmits(["close"]);
</script>
