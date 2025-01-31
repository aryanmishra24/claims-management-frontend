<template>
    <div>
      <h2>Create Policyholder</h2>
      <form @submit.prevent="submitForm">
        <input v-model="policyholder.id" placeholder="ID" required />
        <input v-model="policyholder.name" placeholder="Name" required />
        <input v-model="policyholder.contactInfo" placeholder="Contact Info" required />
        <button type="submit">Create</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import api from "../api";
  
  export default {
    data() {
      return {
        policyholder: { id: "", name: "", contactInfo: "" },
        message: "",
      };
    },
    methods: {
      async submitForm() {
        try {
          const response = await api.createPolicyholder(this.policyholder);
          this.message = response.data.message;
        } catch (error) {
          this.message = "Error: " + error.response.data.error;
        }
      },
    },
  };
  </script>
  