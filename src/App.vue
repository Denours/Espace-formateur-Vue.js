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
        <!-- Barre du haut -->
        <div class="flex justify-between items-start mb-8">
          <div>
            <p class="text-sm text-gray-500 mt-1">
              <template v-if="isLoading">Chargement…</template>
              <template v-else>
                {{ totalResources }} ressources •
                {{ formations.length }} formations
              </template>
            </p>
          </div>
          <button
            @click="isModalOpen = true"
            :disabled="isLoading"
            class="bg-primary text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Ajouter une ressource
          </button>
        </div>

        <!-- État : chargement initial -->
        <div
          v-if="isLoading"
          class="flex flex-col items-center justify-center py-24 text-gray-400"
        >
          <div
            class="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"
          ></div>
          <p class="text-sm">Chargement des formations…</p>
        </div>

        <!-- État : erreur serveur -->
        <div
          v-else-if="error"
          class="bg-red-50 border border-red-200 rounded-xl px-6 py-5 text-sm text-red-700 flex items-start gap-3"
        >
          <span class="text-xl">⚠️</span>
          <div>
            <p class="font-semibold mb-1">Impossible de contacter le serveur</p>
            <p class="text-red-500">{{ error }}</p>
            <button
              @click="fetchFormations"
              class="mt-3 px-4 py-1.5 bg-red-100 hover:bg-red-200 rounded-lg transition text-red-700 font-medium"
            >
              Réessayer
            </button>
          </div>
        </div>

        <!-- État : données chargées -->
        <template v-else>
          <FormationCard
            v-for="formation in formations"
            :key="formation.id"
            :formation="formation"
          />
        </template>
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

const {
  formations,
  isLoading,
  error,
  totalResources,
  fetchFormations,
  addResource,
} = useFormations();

const isModalOpen = ref(false);
const isSidebarOpen = ref(window.innerWidth >= 1024);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

async function handleAddResource(payload: {
  formationId: number;
  moduleId: number;
  resource: Omit<Resource, "id">;
}) {
  const created = await addResource(
    payload.formationId,
    payload.moduleId,
    payload.resource,
  );
  // Fermer la modale seulement si l'ajout a réussi
  if (created) isModalOpen.value = false;
}

onMounted(() => {
  // Charger les données depuis le serveur au démarrage
  fetchFormations();

  window.addEventListener("resize", () => {
    isSidebarOpen.value = window.innerWidth >= 1024;
  });
});
</script>
