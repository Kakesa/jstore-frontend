<template>
  <form @submit.prevent="addStuff" class="space-y-3">
    <input v-model="title" type="text" placeholder="Titre" class="border p-2 w-full" required />
    <textarea v-model="description" placeholder="Description" class="border p-2 w-full" required></textarea>
    <input v-model="imageUrl" type="text" placeholder="URL de l'image" class="border p-2 w-full" required />
    <input v-model.number="price" type="number" placeholder="Prix" class="border p-2 w-full" required />
    
    <button type="submit" class="bg-green-500 text-white px-4 py-2">Ajouter</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import api from "../api/api";
import { useAuthStore } from "../stores/auth";

const title = ref("");
const description = ref("");
const imageUrl = ref("");
const price = ref(0);

const auth = useAuthStore();
const emit = defineEmits(["added"]);

const addStuff = async () => {
  try {
    const res = await api.post("/stuff", {
      title: title.value,
      description: description.value,
      imageUrl: imageUrl.value,
      price: price.value,
      userId: auth.user?._id, // user connecté
    });

    emit("added", res.data); // notifier Dashboard
    title.value = "";
    description.value = "";
    imageUrl.value = "";
    price.value = 0;
  } catch (err) {
    console.error(err);
    alert("Erreur lors de l’ajout");
  }
};
</script>
