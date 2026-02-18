import { createRouter, createWebHistory } from "vue-router";
import {
  SquaresPlusIcon,
  ChatBubbleLeftIcon,
  UserIcon,
} from "@heroicons/vue/24/outline";

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
      props: { titre: "Tableau de bord", icone: SquaresPlusIcon },
    },
    {
      path: "/messages",
      name: "messages",
      component: () => import("../views/PlaceholderView.vue"),
      props: { titre: "Messages", icone: ChatBubbleLeftIcon },
    },
    {
      path: "/profil",
      name: "profil",
      component: () => import("../views/PlaceholderView.vue"),
      props: { titre: "Mon profil", icone: UserIcon },
    },
  ],
});

export default router;
