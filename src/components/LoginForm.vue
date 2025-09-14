<template>
  <form @submit.prevent="handleLogin" class="space-y-3">
    <input v-model="email" type="email" placeholder="Email" class="border p-2 w-full" />
    <input v-model="password" type="password" placeholder="Mot de passe" class="border p-2 w-full" />
    <button type="submit" class="bg-blue-500 text-white px-4 py-2">Se connecter</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const auth = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  try {
    await auth.login(email.value, password.value);
    if (auth.role === "admin") router.push("/dashboard");
    else router.push("/my-dashboard");
  } catch (err) {
    alert("Échec de connexion");
    console.error(err);
  }
};
</script>
