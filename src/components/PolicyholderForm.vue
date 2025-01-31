<script setup>
import { ref } from "vue";

const name = ref("");
const contactInfo = ref("");

const submitForm = async () => {
  const policyholderId = crypto.randomUUID(); // Generate unique ID

  try {
    const response = await fetch("http://localhost:3000/policyholders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: policyholderId,
        name: name.value,
        contactInfo: contactInfo.value,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(`Policyholder created! ID: ${policyholderId}`);
      name.value = "";
      contactInfo.value = "";
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
    <input v-model="name" placeholder="Name" required />
    <input v-model="contactInfo" placeholder="Contact Info (Email/Phone)" required />
    <button type="submit">Create Policyholder</button>
  </form>
</template>
