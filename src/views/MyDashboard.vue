<template>
  <div>
    <h1>Mon Dashboard</h1>
    <router-link to="/create-thing">➕ Ajouter un objet</router-link>
    <ul>
      <li v-for="thing in things" :key="thing._id">
        <img :src="thing.imageUrl" class="preview" />
        <h3>{{ thing.title }}</h3>
        <p>{{ thing.description }}</p>
        <p>{{ thing.price }} €</p>
        <router-link :to="`/edit-thing/${thing._id}`">Modifier</router-link>
        <button @click="deleteThing(thing._id)">Supprimer</button>
      </li>
    </ul>
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

onMounted(fetchMyThings);
</script>

<style scoped>
.preview { width: 150px; height: 100px; object-fit: cover; margin: 5px 0; }
</style>
