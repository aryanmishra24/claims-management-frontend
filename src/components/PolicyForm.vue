<template>
    <div>
      <h2>Create Policy</h2>
      <form @submit.prevent="submitForm">
        <input v-model="policy.id" placeholder="ID" required />
        <input v-model="policy.policyholderId" placeholder="Policyholder ID" required />
        <input v-model="policy.policyAmount" type="number" placeholder="Amount" required />
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
        policy: { id: "", policyholderId: "", policyAmount: "" },
        message: "",
      };
    },
    methods: {
      async submitForm() {
        try {
          const response = await api.createPolicy(this.policy);
          this.message = response.data.message;
        } catch (error) {
          this.message = "Error: " + error.response.data.error;
        }
      },
    },
  };
  </script>
  