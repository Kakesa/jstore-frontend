<template>
  <div class="max-w-md mx-auto mt-20 p-6 border rounded shadow">
    <h1 class="text-2xl font-bold mb-4">Inscription</h1>
    <RegisterForm />
    <p class="mt-4 text-sm">
      Déjà un compte ? 
      <router-link to="/login" class="text-blue-500">Connectez-vous</router-link>
    </p>
  </div>
</template>

<script setup>
import RegisterForm from "../components/RegisterForm.vue";
</script>
