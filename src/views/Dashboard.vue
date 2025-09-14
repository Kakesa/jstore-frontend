<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
    <StuffForm @added="handleAdded" />
    <StuffList ref="list" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import StuffForm from "../components/StuffForm.vue";
import StuffList from "../components/StuffList.vue";

const list = ref(null);

const handleAdded = (newItem) => {
  list.value.items.push(newItem);
};
</script>
