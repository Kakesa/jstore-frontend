<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Liste des objets</h2>
    <ul>
      <li
        v-for="item in items"
        :key="item._id"
        class="border p-2 my-2 flex justify-between items-center"
      >
        <div>
          <img :src="item.imageUrl" alt="image" class="w-20 h-20 object-cover mb-2" />
          <h3 class="font-bold">{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <p class="text-green-600 font-semibold">{{ item.price }} €</p>
        </div>

        <button @click="deleteStuff(item._id)" class="bg-red-500 text-white px-2 py-1">
          Supprimer
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api/api";

const items = ref([]);

const fetchStuff = async () => {
  try {
    const res = await api.get("/stuff");
    items.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

const deleteStuff = async (id) => {
  try {
    await api.delete(`/stuff/${id}`);
    items.value = items.value.filter((s) => s._id !== id);
  } catch (err) {
    console.error(err);
    alert("Erreur lors de la suppression");
  }
};

onMounted(fetchStuff);

defineExpose({ fetchStuff, items });
</script>
