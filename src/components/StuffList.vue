<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Liste des objets</h2>
    <ul>
      <li v-for="item in items" :key="item._id" class="border p-2 my-2">
        {{ item.title }} - {{ item.description }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api/api";

const items = ref([]);

onMounted(async () => {
  try {
    const res = await api.get("/stuff");
    items.value = res.data;
  } catch (err) {
    console.error(err);
  }
});
</script>
