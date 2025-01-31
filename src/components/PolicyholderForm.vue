<script setup>
import { ref } from "vue";

const name = ref("");
const contactInfo = ref("");

const submitForm = async () => {
  const policyholderId = crypto.randomUUID(); // Generate unique ID

  try {
    const response = await fetch("https://claims-management-1-ohry.onrender.com/policyholders", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": "6f4f79cac51e76536abc47132fa51cc5f35d97375f70da3280779639d568ad6a" },
      body: JSON.stringify({
        id: policyholderId,
        name: name.value,
        contactInfo: contactInfo.value,
      })
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
