import { ref, computed } from "vue";
import type { Formation, Resource } from "../types/formation";
import { formations as initialData } from "../data/mockData";

// État réactif partagé (singleton)
const formations = ref<Formation[]>(initialData);

export function useFormations() {
  const totalResources = computed(() =>
    formations.value
      .map((f) => f.modules.reduce((acc, m) => acc + m.resources.length, 0))
      .reduce((acc, curr) => acc + curr, 0),
  );

  function addResource(
    formationId: number,
    moduleId: number,
    resource: Omit<Resource, "id">,
  ) {
    const formation = formations.value.find((f) => f.id === formationId);
    if (!formation) return;

    const module = formation.modules.find((m) => m.id === moduleId);
    if (!module) return;

    // Générer un id unique
    const allIds = formations.value.flatMap((f) =>
      f.modules.flatMap((m) => m.resources.map((r) => r.id)),
    );
    const newId = allIds.length > 0 ? Math.max(...allIds) + 1 : 1;

    module.resources.push({ id: newId, ...resource });
  }

  return { formations, totalResources, addResource };
}
