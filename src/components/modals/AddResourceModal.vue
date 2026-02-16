<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 overflow-y-auto"
  >
    <div
      class="bg-white w-full max-w-lg rounded-2xl shadow-xl animate-modal max-h-[90vh] flex flex-col"
    >
      <!-- Header -->
      <div class="flex justify-between items-center px-6 py-5 border-b">
        <div>
          <h2 class="text-lg font-semibold">Ajouter une ressource</h2>
          <p class="text-sm text-gray-500 mt-1">
            Téléchargez un document pour vos apprenants
          </p>
        </div>

        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>
      </div>

      <!-- Body -->
      <div class="px-6 py-6 space-y-5 overflow-y-auto">
        <!-- Formation -->
        <div>
          <label class="text-sm font-medium text-gray-700"> Formation </label>
          <select class="input">
            <option>Sélectionner une formation</option>
          </select>
        </div>

        <!-- Module -->
        <div>
          <label class="text-sm font-medium text-gray-700"> Module </label>
          <select class="input">
            <option>Sélectionner un module</option>
          </select>
        </div>

        <!-- Type -->
        <div>
          <label class="text-sm font-medium text-gray-700">
            Type de fichier
          </label>
          <select class="input">
            <option>PDF</option>
            <option>Video</option>
            <option>ZIP</option>
          </select>
        </div>

        <!-- Upload -->
        <div>
          <label class="text-sm font-medium text-gray-700"> Fichier </label>

          <div
            class="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition cursor-pointer"
          >
            <div class="text-3xl mb-3">⬆</div>
            <p class="text-sm text-gray-600">
              Cliquez pour sélectionner ou glissez un fichier
            </p>
            <p class="text-xs text-gray-400 mt-2">
              PDF, Video, ZIP (Max. 100MB)
            </p>
          </div>
        </div>

        <!-- Nom optionnel -->
        <div>
          <label class="text-sm font-medium text-gray-700">
            Nom du fichier (optionnel)
          </label>
          <input
            type="text"
            placeholder="Ex: Cours 1 - Introduction"
            class="input"
          />
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end gap-3 px-6 py-5 border-t">
        <button
          @click="$emit('close')"
          class="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
        >
          Annuler
        </button>

        <button
          class="px-5 py-2 rounded-lg bg-primary text-white hover:bg-blue-700 transition shadow"
        >
          Télécharger
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(["close"]);
</script>

<style>
@keyframes modalScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-modal {
  animation: modalScale 0.2s ease-out;
}

/* Reusable input style */
.input {
  @apply mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition;
}
</style>
