<template>
  <div>
    <h1>Dashboard Admin</h1>
    <ul>
      <li v-for="thing in things" :key="thing._id">
        <img :src="thing.imageUrl" class="preview" />
        <h3>{{ thing.title }}</h3>
        <p>{{ thing.description }}</p>
        <p>{{ thing.price }} €</p>
      </li>
    </ul>
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
  }
};

onMounted(fetchAllThings);
</script>

<style scoped>
.preview { width: 150px; height: 100px; object-fit: cover; margin: 5px 0; }
</style>
