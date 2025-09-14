<template>
  <div class="max-w-md mx-auto mt-20 p-6 border rounded shadow">
    <h1 class="text-2xl font-bold mb-4">Connexion</h1>
    <LoginForm />
    <p class="mt-4 text-sm">
      Pas encore de compte ? 
      <router-link to="/register" class="text-blue-500">Inscrivez-vous</router-link>
    </p>
  </div>
</template>

<script setup>
import LoginForm from "../components/LoginForm.vue";
</script>
