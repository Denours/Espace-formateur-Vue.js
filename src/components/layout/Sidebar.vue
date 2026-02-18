<template>
  <aside
    :class="[
      'bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 z-40 transform transition-transform duration-300',
      isOpen ? 'translate-x-0' : '-translate-x-full',
    ]"
  >
    <!-- Logo / titre -->
    <div class="flex items-center gap-3 px-6 py-5 border-b border-gray-200">
      <div
        class="logobox bg-primary flex items-center justify-center text-white font-semibold"
      >
        JM
      </div>
      <div class="boxtext">
        <p class="logotext font-bold">
          Espace <span class="ml-3">Formateur</span>
        </p>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-4 py-6 space-y-1">
      <SidebarItem to="/dashboard" label="Tableau de bord"
        ><SquaresPlusIcon></SquaresPlusIcon
      ></SidebarItem>
      <SidebarItem to="/sessions" label="Mes sessions"
        ><UsersIcon></UsersIcon
      ></SidebarItem>
      <SidebarItem to="/ressources" label="Ressources"
        ><FolderOpenIcon></FolderOpenIcon
      ></SidebarItem>
      <SidebarItem to="/messages" label="Messages"
        ><ChatBubbleLeftIcon></ChatBubbleLeftIcon
      ></SidebarItem>
      <SidebarItem to="/profil" label="Mon profil"
        ><UserIcon></UserIcon
      ></SidebarItem>
      <RouterLink to="">
        <div
          @click="logout"
          :class="[
            'flex items-center gap-3 px-4 py-2.5 text-red-600 mt-6 rounded-lg text-sm font-medium cursor-pointer transition',
          ]"
        >
          <div class="w-5 h-5">
            <ArrowRightEndOnRectangleIcon class="-ml-3 size-5"></ArrowRightEndOnRectangleIcon>
          </div>
          <span class="logout -ml-2">Déconnexion</span>
        </div>
      </RouterLink>
    </nav>
  </aside>

  <!-- Overlay mobile -->
  <div
    v-if="isOpen"
    @click="$emit('close')"
    class="fixed inset-0 bg-black/30 z-30 lg:hidden"
  />
</template>

<script setup lang="ts">
import SidebarItem from "./SidebarItem.vue";
import {
  SquaresPlusIcon,
  UsersIcon,
  FolderOpenIcon,
  ChatBubbleLeftIcon,
  UserIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/vue/24/outline";

defineProps<{ isOpen: boolean }>();
defineEmits(["close"]);
const logout = () => {
  alert("Pas d'endroit où rediriger");
};
</script>

<style scoped>
aside {
  width: 255px;
}
.logobox {
  width: 33px;
  height: 32px;
  border-radius: 8px;
  padding: 16px 8px;
  padding-right: 14px;
}

.logotext {
  width: 200px;
}

.logout {
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
  vertical-align: middle;
  letter-spacing: 0%;
}
</style>
