<template>
  <div>
    <h2 class="text-xl font-bold mb-4">Liste des objets</h2>
    <ul>
      <li
        v-for="item in items"
        :key="item._id"
        class="border p-2 my-2"
      >
        <!-- Si on est en édition -->
        <div v-if="editId === item._id" class="space-y-2">
          <input v-model="editForm.title" class="border p-1 w-full" />
          <textarea v-model="editForm.description" class="border p-1 w-full"></textarea>
          <input v-model="editForm.imageUrl" class="border p-1 w-full" />
          <input v-model.number="editForm.price" type="number" class="border p-1 w-full" />

          <div class="flex gap-2 mt-2">
            <button @click="updateStuff(item._id)" class="bg-blue-500 text-white px-2 py-1">
              Sauvegarder
            </button>
            <button @click="cancelEdit" class="bg-gray-400 text-white px-2 py-1">
              Annuler
            </button>
          </div>
        </div>

        <!-- Mode affichage normal -->
        <div v-else class="flex justify-between items-center">
          <div>
            <img :src="item.imageUrl" alt="image" class="w-20 h-20 object-cover mb-2" />
            <h3 class="font-bold">{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <p class="text-green-600 font-semibold">{{ item.price }} €</p>
          </div>

          <div class="flex gap-2">
            <button @click="startEdit(item)" class="bg-yellow-500 text-white px-2 py-1">
              Modifier
            </button>
            <button @click="deleteStuff(item._id)" class="bg-red-500 text-white px-2 py-1">
              Supprimer
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../api/api";

const items = ref([]);
const editId = ref(null);
const editForm = ref({
  title: "",
  description: "",
  imageUrl: "",
  price: 0,
});

// Charger la liste
const fetchStuff = async () => {
  try {
    const res = await api.get("/stuff");
    items.value = res.data;
  } catch (err) {
    console.error(err);
  }
};

// Supprimer
const deleteStuff = async (id) => {
  try {
    await api.delete(`/stuff/${id}`);
    items.value = items.value.filter((s) => s._id !== id);
  } catch (err) {
    console.error(err);
    alert("Erreur lors de la suppression");
  }
};

// Activer mode édition
const startEdit = (item) => {
  editId.value = item._id;
  editForm.value = { ...item };
};

// Annuler édition
const cancelEdit = () => {
  editId.value = null;
  editForm.value = { title: "", description: "", imageUrl: "", price: 0 };
};

// Sauvegarder édition
const updateStuff = async (id) => {
  try {
    const res = await api.put(`/stuff/${id}`, editForm.value);
    const index = items.value.findIndex((s) => s._id === id);
    items.value[index] = res.data; // mettre à jour localement
    cancelEdit();
  } catch (err) {
    console.error(err);
    alert("Erreur lors de la mise à jour");
  }
};

onMounted(fetchStuff);

defineExpose({ fetchStuff, items });
</script>
