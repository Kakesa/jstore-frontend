<template>
  <div class="max-w-md mx-auto mt-6 p-4 border rounded shadow" v-if="thing">
    <h2 class="text-xl font-bold mb-4">Modifier l'objet</h2>
    <form @submit.prevent="handleEdit" class="space-y-3">
      <input v-model="thing.title" type="text" placeholder="Titre" class="border p-2 w-full" required />
      <textarea v-model="thing.description" placeholder="Description" class="border p-2 w-full" required></textarea>
      <input v-model.number="thing.price" type="number" placeholder="Prix" class="border p-2 w-full" required />
      <input type="file" @change="handleFileChange" />
      <button type="submit" class="bg-yellow-500 text-white px-4 py-2">Modifier</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const thing = ref(null);
const file = ref(null);

const handleFileChange = (e) => {
  file.value = e.target.files[0];
};

const fetchThing = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/stuff/${route.params.id}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
    thing.value = res.data;
  } catch (err) {
    console.error(err);
    alert("Erreur lors du chargement de l'objet");
  }
};

const handleEdit = async () => {
  const formData = new FormData();
  formData.append("thing", JSON.stringify({ title: thing.value.title, description: thing.value.description, price: thing.value.price }));
  if (file.value) formData.append("image", file.value);

  try {
    await axios.put(`http://localhost:3000/api/stuff/${route.params.id}`, formData, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token"), "Content-Type": "multipart/form-data" }
    });
    alert("Objet modifié avec succès !");
    router.push("/my-dashboard");
  } catch (err) {
    console.error(err);
    alert("Erreur lors de la modification de l'objet");
  }
};

onMounted(fetchThing);
</script>
