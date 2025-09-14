<template>
  <div class="form-container">
    <h1>Créer un Objet</h1>
    <form @submit.prevent="createThing">
      <input v-model="title" type="text" placeholder="Titre" required />
      <textarea v-model="description" placeholder="Description" required></textarea>
      <input v-model.number="price" type="number" placeholder="Prix" required />
      <input type="file" @change="onFileChange" required />
      <button type="submit">Créer</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const title = ref("");
const description = ref("");
const price = ref(0);
const image = ref(null);

const onFileChange = (e) => {
  image.value = e.target.files[0];
};

const createThing = async () => {
  const formData = new FormData();
  formData.append(
    "thing",
    JSON.stringify({ title: title.value, description: description.value, price: price.value })
  );
  formData.append("image", image.value);

  try {
    await axios.post("http://localhost:3000/api/stuff", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });
    alert("Objet créé !");
  } catch (err) {
    console.error(err);
    alert("Erreur lors de la création");
  }
};
</script>

<style scoped>
.form-container { max-width: 600px; margin: auto; padding: 20px; }
input, textarea { width: 100%; margin: 10px 0; padding: 8px; }
button { background: blue; color: white; padding: 10px; border: none; cursor: pointer; }
</style>
