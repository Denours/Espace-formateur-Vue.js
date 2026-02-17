/**
 * src/composables/useFormations.ts
 * Gestion reactive des formations via l'API (Axios).
 * Singleton : l'etat est partage entre tous les composants.
 */

import { ref, computed } from "vue";
import type { Formation, Resource } from "../types/formation";
import * as api from "../services/api";

const formations = ref<Formation[]>([]);
const isLoading = ref(false);
const error = ref<string | null>(null);

export function useFormations() {
  const totalResources = computed(() =>
    formations.value
      .map((f) => f.modules.reduce((acc, m) => acc + m.resources.length, 0))
      .reduce((acc, curr) => acc + curr, 0),
  );

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

  async function addResource(
    formationId: number,
    moduleId: number,
    resource: Omit<Resource, "id">,
  ): Promise<Resource | null> {
    error.value = null;
    try {
      const created = await api.addResource(formationId, moduleId, resource);
      const formation = formations.value.find((f) => f.id === formationId);
      const module = formation?.modules.find((m) => m.id === moduleId);
      module?.resources.push(created);
      return created;
    } catch (err) {
      error.value = (err as Error).message;
      return null;
    }
  }

  async function updateResource(
    formationId: number,
    moduleId: number,
    resourceId: number,
    resource: Omit<Resource, "id">,
  ): Promise<Resource | null> {
    error.value = null;
    try {
      const updated = await api.updateResource(
        formationId,
        moduleId,
        resourceId,
        resource,
      );
      // Mise a jour locale
      const formation = formations.value.find((f) => f.id === formationId);
      const module = formation?.modules.find((m) => m.id === moduleId);
      if (module) {
        const idx = module.resources.findIndex((r) => r.id === resourceId);
        if (idx !== -1) module.resources[idx] = updated;
      }
      return updated;
    } catch (err) {
      error.value = (err as Error).message;
      return null;
    }
  }

  async function deleteResource(
    formationId: number,
    moduleId: number,
    resourceId: number,
  ): Promise<boolean> {
    error.value = null;
    try {
      await api.deleteResource(formationId, moduleId, resourceId);
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
    updateResource,
    deleteResource,
  };
}
