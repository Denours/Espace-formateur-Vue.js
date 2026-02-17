import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/ressources",
    },
    {
      path: "/ressources",
      name: "ressources",
      component: () => import("../views/ResourcesView.vue"),
    },
    {
      path: "/sessions",
      name: "sessions",
      component: () => import("../views/SessionsView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/PlaceholderView.vue"),
      props: { titre: "Tableau de bord", icone: "🏚️" },
    },
    {
      path: "/messages",
      name: "messages",
      component: () => import("../views/PlaceholderView.vue"),
      props: { titre: "Messages", icone: "📩" },
    },
    {
      path: "/profil",
      name: "profil",
      component: () => import("../views/PlaceholderView.vue"),
      props: { titre: "Mon profil", icone: "🙍" },
    },
  ],
});

export default router;
