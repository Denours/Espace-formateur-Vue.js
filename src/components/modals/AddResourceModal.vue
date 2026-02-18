<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 overflow-y-auto"
    @click.self="$emit('close')"
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
          <label class="text-sm font-medium text-gray-700">Formation </label>
          <select
            v-model="selectedFormationId"
            class="input"
            :class="{ 'border-red-400': errors.formation }"
          >
            <option :value="null" disabled>Sélectionner une formation</option>
            <option
              v-for="formation in formations"
              :key="formation.id"
              :value="formation.id"
            >
              {{ formation.title }}
            </option>
          </select>
          <p v-if="errors.formation" class="text-xs text-red-500 mt-1">
            {{ errors.formation }}
          </p>
        </div>

        <!-- Module (dynamique selon la formation choisie) -->
        <div>
          <label class="text-sm font-medium text-gray-700">Module </label>
          <select
            v-model="selectedModuleId"
            class="input"
            :class="{ 'border-red-400': errors.module }"
            :disabled="!selectedFormationId"
          >
            <option :value="null" disabled>
              {{
                selectedFormationId
                  ? "Sélectionner un module"
                  : "Choisissez d'abord une formation"
              }}
            </option>
            <option
              v-for="module in availableModules"
              :key="module.id"
              :value="module.id"
            >
              {{ module.title }}
            </option>
          </select>
          <p v-if="errors.module" class="text-xs text-red-500 mt-1">
            {{ errors.module }}
          </p>
        </div>

        <!-- Type de fichier -->
        <div>
          <label class="text-sm font-medium text-gray-700"
            >Type de fichier
          </label>
          <select v-model="selectedType" class="input">
            <option value="PDF">PDF</option>
            <option value="Video">Video</option>
            <option value="Archive">Archive (ZIP)</option>
          </select>
        </div>

        <!-- Zone d'upload -->
        <div>
          <label class="text-sm font-medium text-gray-700">Fichier </label>
          <div
            class="mt-2 border-2 border-dashed rounded-xl p-8 text-center transition cursor-pointer"
            :class="
              selectedFile
                ? 'border-green-400 bg-green-50'
                : errors.file
                  ? 'border-red-400 bg-red-50'
                  : 'border-gray-300 hover:border-primary'
            "
            @click="fileInputRef?.click()"
            @dragover.prevent
            @drop.prevent="onDrop"
          >
            <!-- Fichier sélectionné -->
            <template v-if="selectedFile">
              <div class="text-3xl mb-2">
                <CheckIcon
                  class="size-10 d-block mx-auto text-green-500"
                ></CheckIcon>
              </div>
              <p class="text-sm font-medium text-green-700 break-words">
                {{ selectedFile.name }}
              </p>
              <p class="text-xs text-green-600 mt-1">{{ formattedFileSize }}</p>
              <button
                @click.stop="clearFile"
                class="mt-2 text-xs text-red-500 hover:underline"
              >
                Supprimer
              </button>
            </template>
            <!-- Pas de fichier -->
            <template v-else>
              <div class="text-3xl mb-3">
                <ArrowUpTrayIcon
                  class="size-10 d-block mx-auto text-gray-400"
                ></ArrowUpTrayIcon>
              </div>
              <p class="text-sm text-gray-600">
                Cliquez pour sélectionner ou glissez un fichier
              </p>
              <p class="text-xs text-gray-400 mt-2">
                PDF, Video, ZIP (Max. 100MB)
              </p>
            </template>
          </div>
          <!-- Input caché -->
          <input
            ref="fileInputRef"
            type="file"
            class="hidden"
            accept=".pdf,.mp4,.mov,.zip,.rar"
            @change="onFileChange"
          />
          <p v-if="errors.file" class="text-xs text-red-500 mt-1">
            {{ errors.file }}
          </p>
        </div>

        <!-- Nom personnalisé -->
        <div>
          <label class="text-sm font-medium text-gray-700">
            Nom du fichier
            <span class="text-gray-400 font-normal">(optionnel)</span>
          </label>
          <input
            v-model="customName"
            type="text"
            placeholder="Ex: Cours 1 - Introduction"
            class="input"
          />
          <p class="text-xs text-gray-400 mt-1">
            Si vide, le nom du fichier sera utilisé.
          </p>
        </div>
      </div>

      <!-- Erreur serveur -->
      <div
        v-if="serverError"
        class="mx-6 mb-2 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-center gap-2"
      >
        <span>
          <ExclamationTriangleIcon class="size-5"></ExclamationTriangleIcon>
        </span>
        {{ serverError }}
      </div>

      <!-- Footer -->
      <div class="flex justify-end gap-3 px-6 py-5 border-t">
        <button
          @click="$emit('close')"
          :disabled="submitting"
          class="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition disabled:opacity-50"
        >
          Annuler
        </button>
        <button
          @click="handleSubmit"
          :disabled="submitting"
          class="flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-white hover:bg-blue-700 transition shadow disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span
            v-if="submitting"
            class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
          ></span>
          {{ submitting ? "Envoi en cours…" : "Télecharger" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { Formation, FileType } from "../../types/formation";
import { CheckIcon } from "@heroicons/vue/24/outline";
import { ArrowUpTrayIcon } from "@heroicons/vue/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";

// ── Props & Emits ──────────────────────────────────────────────
const props = defineProps<{
  formations: Formation[];
}>();

const emit = defineEmits<{
  close: [];
  "add-resource": [
    payload: {
      formationId: number;
      moduleId: number;
      resource: { title: string; type: FileType; size: string; date: string };
    },
  ];
}>();

// ── État du formulaire ─────────────────────────────────────────
const selectedFormationId = ref<number | null>(null);
const selectedModuleId = ref<number | null>(null);
const selectedType = ref<FileType>("PDF");
const customName = ref("");
const selectedFile = ref<File | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);

// ── États async ────────────────────────────────────────────────
const submitting = ref(false);
const serverError = ref<string | null>(null);

// ── Erreurs de validation ──────────────────────────────────────
const errors = ref({ formation: "", module: "", file: "" });

// ── Computed ───────────────────────────────────────────────────
const availableModules = computed(() => {
  if (!selectedFormationId.value) return [];
  return (
    props.formations.find((f) => f.id === selectedFormationId.value)?.modules ??
    []
  );
});

const formattedFileSize = computed(() => {
  if (!selectedFile.value) return "";
  const bytes = selectedFile.value.size;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
});

// Réinitialiser le module quand la formation change
watch(selectedFormationId, () => {
  selectedModuleId.value = null;
  errors.value.formation = "";
  serverError.value = null;
});
watch(selectedModuleId, () => {
  errors.value.module = "";
});

// ── Gestion du fichier ─────────────────────────────────────────
function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files?.[0]) setFile(input.files[0]);
}

function onDrop(event: DragEvent) {
  const file = event.dataTransfer?.files?.[0];
  if (file) setFile(file);
}

function setFile(file: File) {
  const MAX_MB = 100;
  if (file.size > MAX_MB * 1024 * 1024) {
    errors.value.file = `Le fichier dépasse la limite de ${MAX_MB} MB.`;
    return;
  }
  selectedFile.value = file;
  errors.value.file = "";
  serverError.value = null;
  if (!customName.value) {
    customName.value = file.name.replace(/\.[^.]+$/, "");
  }
}

function clearFile() {
  selectedFile.value = null;
  customName.value = "";
  if (fileInputRef.value) fileInputRef.value.value = "";
}

// ── Validation ─────────────────────────────────────────────────
function validate(): boolean {
  let valid = true;
  errors.value = { formation: "", module: "", file: "" };

  if (!selectedFormationId.value) {
    errors.value.formation = "Veuillez sélectionner une formation.";
    valid = false;
  }
  if (!selectedModuleId.value) {
    errors.value.module = "Veuillez sélectionner un module.";
    valid = false;
  }
  if (!selectedFile.value) {
    errors.value.file = "Veuillez sélectionner un fichier.";
    valid = false;
  }
  return valid;
}

// ── Soumission async ───────────────────────────────────────────
async function handleSubmit() {
  if (!validate()) return;

  submitting.value = true;
  serverError.value = null;

  const today = new Date();
  const dateStr = today.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  try {
    // Émettre vers App.vue qui appelle addResource (Axios POST)
    // On utilise une Promise pour attendre la réponse du parent
    await new Promise<void>((resolve, reject) => {
      const cleanup = watch(
        () => props.formations, // si les formations changent → succès
        () => {
          cleanup();
          resolve();
        },
        { deep: true, once: true },
      );
      emit("add-resource", {
        formationId: selectedFormationId.value!,
        moduleId: selectedModuleId.value!,
        resource: {
          title: customName.value.trim() || selectedFile.value!.name,
          type: selectedType.value,
          size: formattedFileSize.value,
          date: dateStr,
        },
      });
      // Timeout de sécurité
      setTimeout(() => {
        cleanup();
        resolve();
      }, 5000);
    });
  } catch (err) {
    serverError.value = (err as Error).message || "Erreur lors de l'envoi.";
  } finally {
    submitting.value = false;
  }
}
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

.input {
  @apply mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm
         focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
         transition disabled:bg-gray-100 disabled:cursor-not-allowed;
}
</style>
