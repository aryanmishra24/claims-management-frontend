<script setup>
import { ref } from "vue";

const policyId = ref("");
const claimAmount = ref("");

const submitForm = async () => {
  const claimId = crypto.randomUUID(); // Generate unique claim ID
  try {
    const response = await fetch("https://claims-management.mishraaryan350.workers.dev/claims", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: claimId, // Use generated claim ID
        policyId: policyId.value,
        claimAmount: claimAmount.value,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(`Claim submitted successfully! Claim ID: ${claimId}`);
      policyId.value = "";
      claimAmount.value = "";
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
    <input v-model="policyId" placeholder="Policy ID" required />
    <input v-model="claimAmount" type="number" placeholder="Claim Amount" required />
    <button type="submit">Submit Claim</button>
  </form>
</template>
