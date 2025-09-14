<template>
  <nav>
    <ul class="flex gap-4">
      <li><router-link to="/">Accueil</router-link></li>
      <li><router-link to="/create">Créer</router-link></li>
      <li v-if="loggedIn">
        <button @click="logout">Se déconnecter</button>
      </li>
      <li v-else>
        <router-link to="/login">Se connecter</router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const loggedIn = computed(() => !!localStorage.getItem("token"));

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  router.push("/login");
};
</script>

<style scoped>
nav ul { list-style: none; display: flex; gap: 1rem; padding: 0; }
button { cursor: pointer; }
</style>
