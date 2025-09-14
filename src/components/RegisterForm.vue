<template>
  <form @submit.prevent="handleRegister" class="space-y-3">
    <input v-model="name" type="text" placeholder="Nom" class="border p-2 w-full" required />
    <input v-model="firstName" type="text" placeholder="Prénom" class="border p-2 w-full" required />
    <input v-model="phone" type="text" placeholder="Téléphone" class="border p-2 w-full" required />
    <input v-model="email" type="email" placeholder="Email" class="border p-2 w-full" required />
    <input v-model="password" type="password" placeholder="Mot de passe" class="border p-2 w-full" required />
    <button type="submit" class="bg-green-500 text-white px-4 py-2">S'inscrire</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const name = ref("");
const firstName = ref("");
const phone = ref("");
const email = ref("");
const password = ref("");

const auth = useAuthStore();
const router = useRouter();

const handleRegister = async () => {
  try {
    await auth.register({
      name: name.value,
      firstName: firstName.value,
      phone: phone.value,
      email: email.value,
      password: password.value,
      role: "user" // rôle par défaut
    });
    alert("Compte créé avec succès ! Connectez-vous.");
    router.push("/login");
  } catch (err) {
    console.error(err);
    alert("Erreur lors de l'inscription.");
  }
};
</script>
