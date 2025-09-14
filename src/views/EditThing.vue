<template>
  <div class="form-container">
    <h1>Modifier un Objet</h1>
    <form v-if="thing" @submit.prevent="updateThing">
      <input v-model="thing.title" type="text" placeholder="Titre" required />
      <textarea v-model="thing.description" placeholder="Description" required></textarea>
      <input v-model.number="thing.price" type="number" placeholder="Prix" required />

      <p>Image actuelle :</p>
      <img :src="thing.imageUrl" alt="Image actuelle" class="preview" />

      <p>Nouvelle image (facultatif) :</p>
      <input type="file" @change="onFileChange" />

      <button type="submit">Mettre à jour</button>
    </form>

    <div v-else>Chargement...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const thing = ref(null);
const newImage = ref(null);

const fetchThing = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/stuff/${route.params.id}`, {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    });
    thing.value = res.data;
  } catch (err) {
    console.error(err);
    alert("Erreur de chargement");
  }
};

const onFileChange = (e) => {
  newImage.value = e.target.files[0];
};

const updateThing = async () => {
  const formData = new FormData();
  formData.append("thing", JSON.stringify({
    title: thing.value.title,
    description: thing.value.description,
    price: thing.value.price
  }));

  if (newImage.value) {
    formData.append("image", newImage.value);
  }

  try {
    await axios.put(`http://localhost:3000/api/stuff/${route.params.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });
    alert("Objet modifié !");
    router.push("/");
  } catch (err) {
    console.error(err);
    alert("Erreur lors de la modification");
  }
};

onMounted(fetchThing);
</script>

<style scoped>
.form-container { max-width: 600px; margin: auto; padding: 20px; }
input, textarea { width: 100%; margin: 10px 0; padding: 8px; }
.preview { max-width: 200px; margin: 10px 0; border-radius: 5px; }
button { background: orange; color: white; padding: 10px; border: none; cursor: pointer; }
</style>
