<script setup>
import { ref } from "vue";

const policyholderId = ref("");
const policyAmount = ref("");

const submitForm = async () => {
  const policyId = crypto.randomUUID(); // Generate unique ID

  try {
    const response = await fetch("https://claims-management.mishraaryan350.workers.dev/policies", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      "x-api-key": "6f4f79cac51e76536abc47132fa51cc5f35d97375f70da3280779639d568ad6a" // Replace with your actual API key
    },
      body: JSON.stringify({
        id: policyId,
        policyholderId: policyholderId.value,
        policyAmount: policyAmount.value,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(`Policy created! Policy ID: ${policyId}`);
      policyholderId.value = "";
      policyAmount.value = "";
    } else {
      alert("Error: " + data.error);
    }
  } catch (error) {
    console.error("Request failed", error);
  }
};
</script>

<template>
  <form @submit.prevent="submitForm">
    <input v-model="policyholderId" placeholder="Policyholder ID" required />
    <input v-model="policyAmount" type="number" placeholder="Policy Amount" required />
    <button type="submit">Create Policy</button>
  </form>
</template>
