<template>
    <div>
      <h2>Submit a Claim</h2>
      <form @submit.prevent="submitForm">
        <input v-model="claim.id" placeholder="ID" required />
        <input v-model="claim.policyId" placeholder="Policy ID" required />
        <input v-model="claim.claimAmount" type="number" placeholder="Amount" required />
        <button type="submit">Submit Claim</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
  import api from "../api";
  
  export default {
    data() {
      return {
        claim: { id: "", policyId: "", claimAmount: "" },
        message: "",
      };
    },
    methods: {
      async submitForm() {
        try {
          const response = await api.createClaim(this.claim);
          this.message = response.data.message;
        } catch (error) {
          this.message = "Error: " + error.response.data.error;
        }
      },
    },
  };
  </script>
  