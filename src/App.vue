<template>
  <div class="flex h-screen overflow-hidden">
    <Sidebar :isOpen="isSidebarOpen" @close="isSidebarOpen = false" />

    <div
      :class="[
        'flex-1 flex flex-col transition-all duration-300',
        isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0',
      ]"
    >
      <HeaderBar @toggleSidebar="toggleSidebar" />

      <main class="flex-1 p-8 overflow-y-auto">
        <div class="flex justify-between items-start mb-8">
          <div>
            <p class="text-sm text-gray-500 mt-1">
              {{ totalResources }} ressources •
              {{ formations.length }} formations
            </p>
          </div>

          <button
            @click="isModalOpen = true"
            class="bg-primary text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Ajouter une ressource
          </button>
        </div>

        <FormationCard
          v-for="formation in formations"
          :key="formation.id"
          :formation="formation"
        />
      </main>
    </div>

    <AddResourceModal
      v-if="isModalOpen"
      :formations="formations"
      @close="isModalOpen = false"
      @add-resource="handleAddResource"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useFormations } from "./composables/useFormations";
import Sidebar from "./components/layout/Sidebar.vue";
import HeaderBar from "./components/layout/HeaderBar.vue";
import FormationCard from "./components/formation/FormationCard.vue";
import AddResourceModal from "./components/modals/AddResourceModal.vue";
import type { Resource } from "./types/formation";

const { formations, totalResources, addResource } = useFormations();

const isModalOpen = ref(false);
const isSidebarOpen = ref(window.innerWidth >= 1024);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

function handleAddResource(payload: {
  formationId: number;
  moduleId: number;
  resource: Omit<Resource, "id">;
}) {
  addResource(payload.formationId, payload.moduleId, payload.resource);
  isModalOpen.value = false;
}

onMounted(() => {
  window.addEventListener("resize", () => {
    isSidebarOpen.value = window.innerWidth >= 1024;
  });
});
</script>