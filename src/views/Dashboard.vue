<template>
  <div class="max-w-4xl mx-auto mt-6 p-4">
    <h1 class="text-2xl font-bold mb-4">Dashboard Admin</h1>

    <ul v-if="things.length" class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <li v-for="thing in things" :key="thing._id" class="border p-4 rounded shadow">
        <img :src="thing.imageUrl" class="w-full h-40 object-cover mb-2 rounded" />
        <h3 class="font-bold">{{ thing.title }}</h3>
        <p>{{ thing.description }}</p>
        <p class="font-semibold">{{ thing.price }} €</p>
        <p class="text-sm text-gray-600">Utilisateur: {{ thing.userId }}</p>
      </li>
    </ul>
    <p v-else class="mt-4 text-gray-500">Aucun objet disponible.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const things = ref([]);

const fetchAllThings = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/stuff");
    things.value = res.data;
  } catch (err) {
    console.error(err);
    alert("Erreur lors du chargement des objets");
  }
};

onMounted(fetchAllThings);
</script>
