<template>
  <div class="max-w-4xl mx-auto mt-6 p-4">
    <h1 class="text-2xl font-bold mb-4">Mon Dashboard</h1>
    <router-link to="/create-thing" class="bg-green-500 text-white px-4 py-2 rounded mb-4 inline-block">➕ Ajouter un objet</router-link>
    
    <ul v-if="things.length" class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <li v-for="thing in things" :key="thing._id" class="border p-4 rounded shadow">
        <img :src="thing.imageUrl" class="w-full h-40 object-cover mb-2 rounded" />
        <h3 class="font-bold">{{ thing.title }}</h3>
        <p>{{ thing.description }}</p>
        <p class="font-semibold">{{ thing.price }} €</p>
        <div class="mt-2 flex gap-2">
          <router-link :to="`/edit-thing/${thing._id}`" class="bg-yellow-500 text-white px-3 py-1 rounded">Modifier</router-link>
          <button @click="deleteThing(thing._id)" class="bg-red-500 text-white px-3 py-1 rounded">Supprimer</button>
        </div>
      </li>
    </ul>
    <p v-else class="mt-4 text-gray-500">Vous n’avez aucun objet pour le moment.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const things = ref([]);

const fetchMyThings = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/stuff/mine", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
    things.value = res.data;
  } catch (err) {
    console.error(err);
    alert("Erreur lors du chargement de vos objets");
  }
};

const deleteThing = async (id) => {
  if (confirm("Supprimer cet objet ?")) {
    try {
      await axios.delete(`http://localhost:3000/api/stuff/${id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      });
      things.value = things.value.filter(t => t._id !== id);
      alert("Objet supprimé !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression");
    }
  }
};

onMounted(fetchMyThings);
</script>
