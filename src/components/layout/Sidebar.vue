<template>
  <aside
    :class="[
      'bg-white w-64 border-r border-gray-200 flex flex-col transition-all duration-300',
      isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
    ]"
    class="fixed lg:static inset-y-0 left-0 z-40"
  >
    <!-- Top -->
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

    <!-- Menu -->
    <nav class="flex-1 px-4 py-6 space-y-2">
      <SidebarItem label="Tableau de bord">🏚️</SidebarItem>
      <SidebarItem label="Mes sessions">⏲️</SidebarItem>
      <SidebarItem label="Ressources" active>®️</SidebarItem>
      <SidebarItem label="Messages">📩</SidebarItem>
      <SidebarItem label="Mon profil">🙍</SidebarItem>
    </nav>
  </aside>

  <!-- Overlay mobile -->
  <div
    v-if="isMobileOpen"
    @click="isMobileOpen = false"
    class="fixed inset-0 bg-black/30 z-30 lg:hidden"
  />
</template>

<script setup lang="ts">
import { ref, provide } from "vue";
import SidebarItem from "./SidebarItem.vue";

const isMobileOpen = ref(false);
provide("toggleSidebar", () => (isMobileOpen.value = !isMobileOpen.value));
</script>
