/**
 * src/composables/useFormations.ts
 * Gestion réactive des formations via l'API (Axios).
 * Singleton : l'état est partagé entre tous les composants qui l'importent.
 */

import { ref, computed } from "vue";
import type { Formation, Resource } from "../types/formation";
import * as api from "../services/api";

// ── État global singleton ──────────────────────────────────────
const formations = ref<Formation[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);

export function useFormations() {
  // ── Computed ─────────────────────────────────────────────────
  const totalResources = computed(() =>
    formations.value
      .map((f) => f.modules.reduce((acc, m) => acc + m.resources.length, 0))
      .reduce((acc, curr) => acc + curr, 0),
  );

  // ── Charger toutes les formations depuis le serveur ───────────
  async function fetchFormations(): Promise<void> {
    isLoading.value = true;
    error.value = null;
    try {
      formations.value = await api.getFormations();
    } catch (err) {
      error.value = (err as Error).message;
    } finally {
      isLoading.value = false;
    }
  }

  // ── Ajouter une ressource (POST → serveur, puis MAJ locale) ──
  async function addResource(
    formationId: number,
    moduleId: number,
    resource: Omit<Resource, "id">,
  ): Promise<Resource | null> {
    error.value = null;
    try {
      // 1. Envoi au serveur → retourne la ressource avec son vrai id
      const created = await api.addResource(formationId, moduleId, resource);

      // 2. Mise à jour optimiste de l'état local (pas de re-fetch)
      const formation = formations.value.find((f) => f.id === formationId);
      const module = formation?.modules.find((m) => m.id === moduleId);
      module?.resources.push(created);

      return created;
    } catch (err) {
      error.value = (err as Error).message;
      return null;
    }
  }

  // ── Supprimer une ressource (DELETE → serveur, puis MAJ locale) ──
  async function deleteResource(
    formationId: number,
    moduleId: number,
    resourceId: number,
  ): Promise<boolean> {
    error.value = null;
    try {
      await api.deleteResource(formationId, moduleId, resourceId);

      // Retrait local
      const formation = formations.value.find((f) => f.id === formationId);
      const module = formation?.modules.find((m) => m.id === moduleId);
      if (module) {
        module.resources = module.resources.filter((r) => r.id !== resourceId);
      }
      return true;
    } catch (err) {
      error.value = (err as Error).message;
      return false;
    }
  }

  return {
    formations,
    isLoading,
    error,
    totalResources,
    fetchFormations,
    addResource,
    deleteResource,
  };
}
