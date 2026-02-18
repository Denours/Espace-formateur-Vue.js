<template>
  <div
    :class="[
      'rounded-lg border transition-all',
      isEditing
        ? 'bg-white border-primary shadow-md px-4 py-4'
        : 'bg-gray-50 border-gray-200 hover:bg-gray-100 px-4 py-3',
    ]"
  >
    <!-- ===== MODE LECTURE ===== -->
    <div v-if="!isEditing" class="flex items-center justify-between">
      <!-- Icone + infos -->
      <div class="flex items-center gap-3">
        <div
          :class="[
            'w-5 h-8 rounded-lg flex items-center justify-center text-sm font-bold',
            typeStyle.text,
          ]"
        >
          <!-- {{ resource.type.charAt(0) }} -->
          <component :is="iconMap[resource.type] || DocumentTextIcon" />
        </div>
        <div>
          <p class="text-sm font-medium text-gray-900">{{ resource.title }}</p>
          <p class="text-xs text-gray-500 mt-0.5 space-x-4">
            <span class="font-medium text-gray-800">{{ resource.type }}</span
            ><span class="px-3">•</span>
            <span class="font-normal text-gray-500 px-3">
              {{ resource.size }} </span
            ><span>•</span
            ><span class="font-normal text-gray-500 px-3">
              {{ resource.date }}</span
            >
          </p>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3 text-gray-400">
        <button
          @click="startEdit"
          title="Modifier"
          class="hover:text-primary transition p-1 rounded hover:bg-blue-50"
        >
          <PencilIcon class="size-5"></PencilIcon>
        </button>
        <button
          @click="confirmDelete"
          title="Supprimer"
          :disabled="deleting"
          class="hover:text-red-500 transition p-1 rounded hover:bg-red-50 disabled:opacity-40"
        >
          <span
            v-if="deleting"
            class="inline-block w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"
          ></span>
          <span v-else>
            <TrashIcon class="size-5"></TrashIcon>
          </span>
        </button>
      </div>
    </div>

    <!-- ===== CONFIRMATION SUPPRESSION ===== -->
    <div
      v-if="showDeleteConfirm && !isEditing"
      class="mt-3 flex items-center justify-between bg-red-50 border border-red-200 rounded-lg px-4 py-2.5"
    >
      <p class="text-sm text-red-700 font-medium">
        Supprimer cette ressource ?
      </p>
      <div class="flex gap-2">
        <button
          @click="showDeleteConfirm = false"
          class="px-3 py-1 text-xs rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
        >
          Annuler
        </button>
        <button
          @click="executeDelete"
          class="px-3 py-1 text-xs rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
        >
          Confirmer
        </button>
      </div>
    </div>

    <!-- ===== MODE EDITION ===== -->
    <div v-if="isEditing">
      <!-- Titre edition -->
      <div class="flex items-center justify-between mb-4">
        <p class="text-sm font-semibold text-primary">Modifier la ressource</p>
        <button
          @click="cancelEdit"
          class="text-gray-400 hover:text-gray-600 text-lg leading-none"
        >
          <XMarkIcon class="size-5"></XMarkIcon>
        </button>
      </div>

      <div class="space-y-3">
        <!-- Titre -->
        <div>
          <label class="text-xs font-medium text-gray-600 block mb-1"
            >Titre</label
          >
          <input
            v-model="editForm.title"
            type="text"
            class="edit-input"
            :class="{ 'border-red-400': editErrors.title }"
            placeholder="Titre de la ressource"
          />
          <p v-if="editErrors.title" class="text-xs text-red-500 mt-1">
            {{ editErrors.title }}
          </p>
        </div>

        <!-- Type + Taille sur la meme ligne -->
        <div class="flex gap-3">
          <div class="flex-1">
            <label class="text-xs font-medium text-gray-600 block mb-1"
              >Type</label
            >
            <select v-model="editForm.type" class="edit-input">
              <option value="PDF">PDF</option>
              <option value="Video">Video</option>
              <option value="Archive">Archive</option>
            </select>
          </div>
          <div class="flex-1">
            <label class="text-xs font-medium text-gray-600 block mb-1"
              >Taille</label
            >
            <input
              v-model="editForm.size"
              type="text"
              class="edit-input"
              :class="{ 'border-red-400': editErrors.size }"
              placeholder="Ex: 2.4 MB"
            />
            <p v-if="editErrors.size" class="text-xs text-red-500 mt-1">
              {{ editErrors.size }}
            </p>
          </div>
        </div>

        <!-- Date -->
        <div>
          <label class="text-xs font-medium text-gray-600 block mb-1"
            >Date</label
          >
          <input
            v-model="editForm.date"
            type="text"
            class="edit-input"
            placeholder="Ex: 10 Jan 2026"
          />
        </div>
      </div>

      <!-- Erreur serveur -->
      <div
        v-if="editError"
        class="mt-3 px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2"
      >
        <span>
          <ExclamationTriangleIcon class="size-5"></ExclamationTriangleIcon>
        </span>
        {{ editError }}
      </div>

      <!-- Boutons edition -->
      <div class="flex justify-end gap-2 mt-4">
        <button
          @click="cancelEdit"
          :disabled="saving"
          class="px-4 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition disabled:opacity-50"
        >
          Annuler
        </button>
        <button
          @click="saveEdit"
          :disabled="saving"
          class="flex items-center gap-2 px-4 py-1.5 text-sm rounded-lg bg-primary text-white hover:bg-blue-700 transition disabled:opacity-60"
        >
          <span
            v-if="saving"
            class="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"
          ></span>
          {{ saving ? "Sauvegarde…" : "Sauvegarder" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { Resource, FileType } from "../../types/formation";
import { useFormations } from "../../composables/useFormations";
import type { Component } from "vue";
import { DocumentTextIcon } from "@heroicons/vue/24/outline";
import { VideoCameraIcon } from "@heroicons/vue/24/outline";
import { PencilIcon } from "@heroicons/vue/24/outline";
import { TrashIcon } from "@heroicons/vue/24/outline";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";

const props = defineProps<{
  resource: Resource;
  formationId: number;
  moduleId: number;
}>();

const { updateResource, deleteResource } = useFormations();

// ── Etats UI ────────────────────────────────────────────────────
const isEditing = ref(false);
const saving = ref(false);
const deleting = ref(false);
const showDeleteConfirm = ref(false);
const editError = ref<string | null>(null);
const editErrors = ref({ title: "", size: "" });

// ── Formulaire d'edition (copie locale des valeurs) ─────────────
const editForm = ref({
  title: "",
  type: "PDF" as FileType,
  size: "",
  date: "",
});
const iconMap: Record<string, Component> = {
  PDF: DocumentTextIcon,
  Video: VideoCameraIcon,
  Archive: DocumentTextIcon,
};
// ── Couleur selon le type ───────────────────────────────────────
const typeStyle = computed(() => {
  switch (props.resource.type) {
    case "PDF":
      return { text: "text-primary" };
    case "Video":
      return { text: "text-purple-500" };
    case "Archive":
      return { text: "text-primary" };
    default:
      return { bg: "bg-gray-100", text: "text-gray-600" };
  }
});

// ── Demarrer l'edition ──────────────────────────────────────────
function startEdit() {
  editForm.value = {
    title: props.resource.title,
    type: props.resource.type,
    size: props.resource.size,
    date: props.resource.date,
  };
  editError.value = null;
  editErrors.value = { title: "", size: "" };
  isEditing.value = true;
  showDeleteConfirm.value = false;
}

function cancelEdit() {
  isEditing.value = false;
  editError.value = null;
}

// ── Validation du formulaire d'edition ─────────────────────────
function validateEdit(): boolean {
  let valid = true;
  editErrors.value = { title: "", size: "" };
  if (!editForm.value.title.trim()) {
    editErrors.value.title = "Le titre est obligatoire.";
    valid = false;
  }
  if (!editForm.value.size.trim()) {
    editErrors.value.size = "La taille est obligatoire.";
    valid = false;
  }
  return valid;
}

// ── Sauvegarder les modifications ──────────────────────────────
async function saveEdit() {
  if (!validateEdit()) return;

  saving.value = true;
  editError.value = null;

  const result = await updateResource(
    props.formationId,
    props.moduleId,
    props.resource.id,
    {
      title: editForm.value.title.trim(),
      type: editForm.value.type,
      size: editForm.value.size.trim(),
      date: editForm.value.date.trim(),
    },
  );

  saving.value = false;

  if (result) {
    isEditing.value = false;
  } else {
    editError.value = "Erreur lors de la sauvegarde. Veuillez reessayer.";
  }
}

// ── Suppression ─────────────────────────────────────────────────
function confirmDelete() {
  showDeleteConfirm.value = true;
}

async function executeDelete() {
  showDeleteConfirm.value = false;
  deleting.value = true;
  await deleteResource(props.formationId, props.moduleId, props.resource.id);
  deleting.value = false;
}
</script>

<style scoped>
.edit-input {
  @apply w-full border border-gray-300 rounded-lg px-3 py-2 text-sm
         focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition;
}
</style>
