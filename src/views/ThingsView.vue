<template>
  <div class="container">
    <h1>Liste des Objets</h1>
    <div v-if="loading">Chargement...</div>
    <div v-else>
      <div v-if="things.length === 0">Aucun objet trouvé.</div>
      <div v-else class="grid">
        <div v-for="thing in things" :key="thing._id" class="card">
          <img :src="thing.imageUrl" alt="image" />
          <h2>{{ thing.title }}</h2>
          <p>{{ thing.description }}</p>
          <p><strong>{{ thing.price }} €</strong></p>
          <button @click="deleteThing(thing._id)">🗑️ Supprimer</button>
          <button @click="$router.push(`/edit-thing/${thing._id}`)">✏️ Modifier</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const things = ref([]);
const loading = ref(true);

const fetchThings = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/stuff", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
    things.value = res.data;
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};

const deleteThing = async (id) => {
  if (confirm("Supprimer cet objet ?")) {
    await axios.delete(`http://localhost:3000/api/stuff/${id}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
    things.value = things.value.filter(t => t._id !== id);
  }
};

onMounted(fetchThings);
</script>

<style scoped>
.container { max-width: 800px; margin: auto; padding: 20px; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1rem; }
.card { border: 1px solid #ddd; padding: 10px; border-radius: 5px; text-align: center; }
.card img { max-width: 100%; height: 150px; object-fit: cover; border-radius: 5px; }
</style>
