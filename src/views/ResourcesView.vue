<template>
  <div class="p-8">
    <!-- En-tête -->
    <div class="flex justify-between items-start mb-8">
      <p class="text-sm text-gray-500 mt-1">
        <template v-if="isLoading">Chargement…</template>
        <template v-else>
          {{ totalResources }} ressources • {{ formations.length }} formations
        </template>
      </p>

      <button
        @click="isModalOpen = true"
        :disabled="isLoading"
        class="bg-primary text-white px-5 py-3 rounded-lg shadow-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div class="flex">
          <ArrowUpTrayIcon class="size-5 font-bold"></ArrowUpTrayIcon>
          <span class="ml-5">Ajouter une ressource</span>
        </div>
      </button>
    </div>

    <!-- Chargement -->
    <div
      v-if="isLoading"
      class="flex flex-col items-center justify-center py-24 text-gray-400"
    >
      <div
        class="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"
      ></div>
      <p class="text-sm">Chargement des formations…</p>
    </div>

    <!-- Erreur serveur -->
    <div
      v-else-if="error"
      class="bg-red-50 border border-red-200 rounded-xl px-6 py-5 text-sm text-red-700 flex items-start gap-3"
    >
      <span class="text-xl">
        <ExclamationTriangleIcon class="size-5"></ExclamationTriangleIcon>
      </span>
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

    <!-- Liste des formations -->
    <template v-else>
      <FormationCard
        v-for="formation in formations"
        :key="formation.id"
        :formation="formation"
      />
    </template>

    <!-- Modale ajout ressource -->
    <AddResourceModal
      v-if="isModalOpen"
      :formations="formations"
      @close="isModalOpen = false"
      @add-resource="handleAddResource"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useFormations } from "../composables/useFormations";
import FormationCard from "../components/formation/FormationCard.vue";
import AddResourceModal from "../components/modals/AddResourceModal.vue";
import type { Resource } from "../types/formation";
import { ArrowUpTrayIcon } from "@heroicons/vue/24/solid";
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";

const {
  formations,
  isLoading,
  error,
  totalResources,
  fetchFormations,
  addResource,
} = useFormations();

const isModalOpen = ref(false);

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
  if (created) isModalOpen.value = false;
}

onMounted(() => fetchFormations());
</script>
