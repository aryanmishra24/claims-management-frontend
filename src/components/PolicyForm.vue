<script setup>
import { ref } from "vue";

const policyholderId = ref("");
const policyAmount = ref("");

const submitForm = async () => {
  const policyId = crypto.randomUUID(); // Generate unique ID

  try {
    const response = await fetch("http://localhost:3000/policies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
