import { createRouter, createWebHistory } from "vue-router";
import { LayoutDashboard, Users, MessageSquare, User } from "lucide-vue-next";

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
      component: () => import("../views/PlaceholderView.vue"),
      props: { titre: "Mes sessions", icone: Users },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/PlaceholderView.vue"),
      props: { titre: "Tableau de bord", icone: LayoutDashboard },
    },
    {
      path: "/messages",
      name: "messages",
      component: () => import("../views/PlaceholderView.vue"),
      props: { titre: "Messages", icone: MessageSquare },
    },
    {
      path: "/profil",
      name: "profil",
      component: () => import("../views/PlaceholderView.vue"),
      props: { titre: "Mon profil", icone: User },
    },
  ],
});

export default router;
