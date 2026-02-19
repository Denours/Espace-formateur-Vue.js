<template>
  <div class="flex h-screen overflow-hidden">
    <Sidebar :isOpen="isSidebarOpen" @close="isSidebarOpen = false" />

    <div
      :class="[
        'flex-1 flex flex-col transition-all duration-300',
        isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0',
      ]"
    >
      <HeaderBar @toggleSidebar="isSidebarOpen = !isSidebarOpen" />
      <main class="flex-1 overflow-y-auto px-28">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Sidebar from "./components/layout/Sidebar.vue";
import HeaderBar from "./components/layout/HeaderBar.vue";

const isSidebarOpen = ref(window.innerWidth >= 1024);

onMounted(() => {
  window.addEventListener("resize", () => {
    isSidebarOpen.value = window.innerWidth >= 1024;
  });
});
</script>
