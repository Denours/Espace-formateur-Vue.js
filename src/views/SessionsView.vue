<template>
  <div class="p-8">
    <!-- En-tête de page -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-xl font-semibold text-gray-800">Mes sessions</h1>
        <p class="text-sm text-gray-500 mt-1">
          {{ sessions.length }} session{{
            sessions.length > 1 ? "s" : ""
          }}
          planifiée{{ sessions.length > 1 ? "s" : "" }}
        </p>
      </div>
      <button
        class="bg-primary text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        + Nouvelle session
      </button>
    </div>

    <!-- Statistiques rapides -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <div class="bg-blue-50 border border-blue-100 rounded-xl p-5">
        <p
          class="text-xs text-blue-500 font-medium uppercase tracking-wide mb-1"
        >
          A venir
        </p>
        <p class="text-2xl font-bold text-blue-700">{{ sessionsAVenir }}</p>
      </div>
      <div class="bg-green-50 border border-green-100 rounded-xl p-5">
        <p
          class="text-xs text-green-500 font-medium uppercase tracking-wide mb-1"
        >
          Terminees
        </p>
        <p class="text-2xl font-bold text-green-700">{{ sessionsTerminees }}</p>
      </div>
      <div class="bg-orange-50 border border-orange-100 rounded-xl p-5">
        <p
          class="text-xs text-orange-500 font-medium uppercase tracking-wide mb-1"
        >
          En cours
        </p>
        <p class="text-2xl font-bold text-orange-700">{{ sessionsEnCours }}</p>
      </div>
    </div>

    <!-- Liste des sessions -->
    <div class="space-y-4">
      <div
        v-for="session in sessions"
        :key="session.id"
        class="bg-white rounded-xl border border-gray-200 shadow-card px-6 py-5 flex items-center justify-between hover:border-primary transition"
      >
        <!-- Infos session -->
        <div class="flex items-center gap-4">
          <div
            :class="[
              'w-10 h-10 rounded-xl flex items-center justify-center text-lg',
              statusStyle(session.statut).bg,
            ]"
          >
            <component
              :is="statusStyle(session.statut).icone"
              class="w-5 h-5"
            />
          </div>
          <div>
            <p class="font-semibold text-gray-800 text-sm">
              {{ session.formation }}
            </p>
            <p class="text-xs text-gray-500 mt-0.5">
              {{ session.dateDebut }} → {{ session.dateFin }} •
              {{ session.apprenants }} apprenants
            </p>
          </div>
        </div>

        <!-- Badge statut + actions -->
        <div class="flex items-center gap-3">
          <span
            :class="[
              'text-xs font-medium px-3 py-1 rounded-full',
              statusStyle(session.statut).badge,
            ]"
          >
            {{ session.statut }}
          </span>
          <button
            class="text-gray-400 hover:text-primary transition p-1 rounded hover:bg-blue-50"
          >
            <PencilIcon class="size-5"></PencilIcon>
          </button>
          <button
            class="text-gray-400 hover:text-red-500 transition p-1 rounded hover:bg-red-50"
          >
            <TrashIcon class="size-5"></TrashIcon>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { PencilIcon } from "@heroicons/vue/24/outline";
import { TrashIcon } from "@heroicons/vue/24/outline";
import { ClockIcon } from "@heroicons/vue/24/outline";
import { CalendarDaysIcon } from "@heroicons/vue/24/outline";
import { CheckIcon } from "@heroicons/vue/24/outline";

interface Session {
  id: number;
  formation: string;
  dateDebut: string;
  dateFin: string;
  apprenants: number;
  statut: "A venir" | "En cours" | "Terminee";
}

const sessions: Session[] = [
  {
    id: 1,
    formation: "Developpement Fullstack PHP",
    dateDebut: "03 Fev 2026",
    dateFin: "28 Mar 2026",
    apprenants: 12,
    statut: "En cours",
  },
  {
    id: 2,
    formation: "Marketing Digital",
    dateDebut: "10 Mar 2026",
    dateFin: "05 Avr 2026",
    apprenants: 8,
    statut: "A venir",
  },
  {
    id: 3,
    formation: "Developpement Fullstack PHP",
    dateDebut: "05 Sep 2025",
    dateFin: "30 Oct 2025",
    apprenants: 15,
    statut: "Terminee",
  },
  {
    id: 4,
    formation: "Marketing Digital",
    dateDebut: "01 Nov 2025",
    dateFin: "20 Dec 2025",
    apprenants: 10,
    statut: "Terminee",
  },
];

const sessionsAVenir = computed(
  () => sessions.filter((s) => s.statut === "A venir").length,
);
const sessionsTerminees = computed(
  () => sessions.filter((s) => s.statut === "Terminee").length,
);
const sessionsEnCours = computed(
  () => sessions.filter((s) => s.statut === "En cours").length,
);

function statusStyle(statut: Session["statut"]) {
  switch (statut) {
    case "En cours":
      return {
        bg: "bg-orange-50",
        badge: "bg-orange-100 text-orange-700",
        icone: ClockIcon,
      };
    case "A venir":
      return {
        bg: "bg-blue-50",
        badge: "bg-blue-100 text-blue-700",
        icone: CalendarDaysIcon,
      };
    case "Terminee":
      return {
        bg: "bg-green-50",
        badge: "bg-green-100 text-green-700",
        icone: CheckIcon,
      };
  }
}
</script>
