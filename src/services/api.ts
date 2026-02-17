/**
 * src/services/api.ts
 * Couche Axios centralisée — toutes les communications avec le serveur passent ici.
 */

import axios from "axios";
import type { Formation, Resource } from "../types/formation";

// ── Instance Axios configurée ──────────────────────────────────
const api = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: { "Content-Type": "application/json" },
  timeout: 8000, // 8 secondes max par requête
});

// Intercepteur : log de chaque requête en console (pratique en dev)
api.interceptors.request.use((config) => {
  console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

// Intercepteur : normaliser les erreurs serveur
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error || error.message || "Erreur réseau inconnue.";
    console.error("[API Error]", message);
    return Promise.reject(new Error(message));
  },
);

// ── Fonctions API ──────────────────────────────────────────────

/**
 * Récupère toutes les formations avec leurs modules et ressources.
 */
export async function getFormations(): Promise<Formation[]> {
  const { data } = await api.get<Formation[]>("/formations");
  return data;
}

/**
 * Ajoute une ressource dans un module donné d'une formation.
 * Retourne la ressource créée (avec son id généré par le serveur).
 */
export async function addResource(
  formationId: number,
  moduleId: number,
  resource: Omit<Resource, "id">,
): Promise<Resource> {
  const { data } = await api.post<Resource>(
    `/formations/${formationId}/modules/${moduleId}/resources`,
    resource,
  );
  return data;
}

/**
 * Supprime une ressource par son id.
 */
export async function deleteResource(
  formationId: number,
  moduleId: number,
  resourceId: number,
): Promise<void> {
  await api.delete(
    `/formations/${formationId}/modules/${moduleId}/resources/${resourceId}`,
  );
}
