<template>
  <div class="flex h-screen overflow-hidden">
    <Sidebar />

    <div class="flex-1 flex flex-col">
      <HeaderBar />

      <main class="flex-1 p-8 overflow-y-auto">
        <div class="flex justify-between items-start mb-8">
          <div>
            <p class="text-sm text-gray-500 mt-1">
              {{ totalResourcesForms }} ressources •
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
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { formations } from "./data/mockData";
import Sidebar from "./components/layout/Sidebar.vue";
import HeaderBar from "./components/layout/HeaderBar.vue";
import FormationCard from "./components/formation/FormationCard.vue";

const isModalOpen = ref(false);
const totalResourcesForms = computed(() => {
  return formations
    .map((formation) =>
      formation.modules.reduce((acc, m) => acc + m.resources.length, 0),
    )
    .reduce((acc, curr) => acc + curr);
});
</script>
