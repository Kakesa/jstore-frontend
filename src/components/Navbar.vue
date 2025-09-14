<template>
  <nav class="navbar p-4 bg-gray-800 text-white flex justify-between">
    <div>
      <router-link to="/" class="mr-4">Accueil</router-link>
      <router-link to="/all-things">Objets disponibles</router-link>
    </div>

    <div>
      <template v-if="loggedIn">
        <router-link v-if="isAdmin" to="/dashboard" class="mr-4">Dashboard Admin</router-link>
        <router-link v-else to="/my-dashboard" class="mr-4">Mon Dashboard</router-link>
        <button @click="logout" class="bg-red-500 px-3 py-1 rounded">Logout</button>
      </template>
      <template v-else>
        <router-link to="/login" class="mr-4">Login</router-link>
        <router-link to="/register">Register</router-link>
      </template>
    </div>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

const loggedIn = computed(() => !!auth.token);
const isAdmin = computed(() => auth.role === "admin");

const logout = () => {
  auth.logout();
  router.push("/login");
};
</script>
