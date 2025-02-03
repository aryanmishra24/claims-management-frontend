<script setup>
import { ref, onMounted } from 'vue';
import { fetchPolicyholders, fetchPolicies, fetchClaims } from './fetch.js'; // Import fetch functions
import ClaimForm from './components/ClaimForm.vue';
import PolicyholderForm from './components/PolicyholderForm.vue';
import PolicyForm from './components/PolicyForm.vue';

const policyholders = ref([]);
const policies = ref([]);
const claims = ref([]);
const loading = ref(false);
const error = ref(null);

// Auto-fetch data when component mounts
onMounted(async () => {
  try {
    loading.value = true;
    error.value = null;

    // Fetch all data in parallel
    const [holders, policiesData, claimsData] = await Promise.all([
      fetchPolicyholders(),
      fetchPolicies(),
      fetchClaims(),
    ]);

    policyholders.value = holders;
    policies.value = policiesData;
    claims.value = claimsData;
  } catch (err) {
    error.value = err.message;
    console.error("Fetch error:", err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <header>
    <div class="wrapper">
      <PolicyholderForm @created="fetchPolicyholders" />
      <PolicyForm @created="fetchPolicies" />
      <ClaimForm @created="fetchClaims" />
    </div>
  </header>

  <main>
    <div class="actions">
      <button @click="fetchPolicyholders" :disabled="loading">
        {{ loading ? 'Refreshing...' : 'Refresh Policyholders' }}
      </button>
      <button @click="fetchPolicies" :disabled="loading">
        {{ loading ? 'Refreshing...' : 'Refresh Policies' }}
      </button>
      <button @click="fetchClaims" :disabled="loading">
        {{ loading ? 'Refreshing...' : 'Refresh Claims' }}
      </button>
    </div>

    <div v-if="error" class="error-message">
      Error: {{ error }}
    </div>

    <div v-if="loading" class="loading">
      Loading data...
    </div>

    <div v-if="policyholders.length">
      <h2>Policyholders ({{ policyholders.length }})</h2>
      <ul>
        <li v-for="holder in policyholders" :key="holder.id">
          #{{ holder.id }} - {{ holder.name }} ({{ holder.contactInfo }})
        </li>
      </ul>
    </div>

    <div v-if="policies.length">
      <h2>Policies ({{ policies.length }})</h2>
      <ul>
        <li v-for="policy in policies" :key="policy.id">
          Policy #{{ policy.id }} - ${{ policy.policyAmount }} (Holder: {{ policy.policyholderId }})
        </li>
      </ul>
    </div>

    <div v-if="claims.length">
      <h2>Claims ({{ claims.length }})</h2>
      <ul>
        <li v-for="claim in claims" :key="claim.id">
          Claim #{{ claim.id }} - ${{ claim.amount }} (Policy: {{ claim.policyId }})
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
/* Add these new styles */
.error-message {
  color: #dc3545;
  padding: 1rem;
  background: #f8d7da;
  border-radius: 4px;
  margin: 1rem 0;
}

.loading {
  color: #0d6efd;
  padding: 1rem;
}

/* Update existing styles */
header {
  line-height: 1.5;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;
  margin-bottom: 2rem;
}

.wrapper {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

ul {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 0.5rem;
}

li {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #dee2e6;
}

button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

button:disabled:hover {
  background-color: #5a6268;
}
</style>