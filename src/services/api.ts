/**
 * src/services/api.ts
 * Couche Axios centralisee - toutes les communications avec le serveur passent ici.
 */

import axios from "axios";
import type { Formation, Resource } from "../types/formation";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: { "Content-Type": "application/json" },
  timeout: 8000,
});

api.interceptors.request.use((config) => {
  console.log("[API] " + config.method?.toUpperCase() + " " + config.url);
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error || error.message || "Erreur reseau inconnue.";
    console.error("[API Error]", message);
    return Promise.reject(new Error(message));
  },
);

export async function getFormations(): Promise<Formation[]> {
  const { data } = await api.get<Formation[]>("/formations");
  return data;
}

export async function addResource(
  formationId: number,
  moduleId: number,
  resource: Omit<Resource, "id">,
): Promise<Resource> {
  const { data } = await api.post<Resource>(
    "/formations/" + formationId + "/modules/" + moduleId + "/resources",
    resource,
  );
  return data;
}

export async function updateResource(
  formationId: number,
  moduleId: number,
  resourceId: number,
  resource: Omit<Resource, "id">,
): Promise<Resource> {
  const { data } = await api.put<Resource>(
    "/formations/" +
      formationId +
      "/modules/" +
      moduleId +
      "/resources/" +
      resourceId,
    resource,
  );
  return data;
}

export async function deleteResource(
  formationId: number,
  moduleId: number,
  resourceId: number,
): Promise<void> {
  await api.delete(
    "/formations/" +
      formationId +
      "/modules/" +
      moduleId +
      "/resources/" +
      resourceId,
  );
}
