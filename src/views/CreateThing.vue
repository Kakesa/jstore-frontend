<template>
  <div class="max-w-md mx-auto mt-6 p-4 border rounded shadow">
    <h2 class="text-xl font-bold mb-4">Ajouter un objet</h2>
    <form @submit.prevent="handleCreate" class="space-y-3">
      <input v-model="title" type="text" placeholder="Titre" class="border p-2 w-full" required />
      <textarea v-model="description" placeholder="Description" class="border p-2 w-full" required></textarea>
      <input v-model.number="price" type="number" placeholder="Prix" class="border p-2 w-full" required />
      <input type="file" @change="handleFileChange" required />
      <button type="submit" class="bg-green-500 text-white px-4 py-2">Créer</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const title = ref("");
const description = ref("");
const price = ref(0);
const file = ref(null);

const router = useRouter();

const handleFileChange = (e) => {
  file.value = e.target.files[0];
};

const handleCreate = async () => {
  if (!file.value) return alert("Veuillez sélectionner une image");

  const formData = new FormData();
  formData.append("thing", JSON.stringify({ title: title.value, description: description.value, price: price.value }));
  formData.append("image", file.value);

  try {
    await axios.post("http://localhost:3000/api/stuff", formData, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token"), "Content-Type": "multipart/form-data" }
    });
    alert("Objet créé avec succès !");
    router.push("/my-dashboard");
  } catch (err) {
    console.error(err);
    alert("Erreur lors de la création de l'objet");
  }
};
</script>
