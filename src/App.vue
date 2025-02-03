<script setup>
import { ref } from 'vue';
import { fetchPolicyholders, fetchPolicies, fetchClaims } from './fetch.js';
import ClaimForm from './components/ClaimForm.vue';
import PolicyholderForm from './components/PolicyholderForm.vue';
import PolicyForm from './components/PolicyForm.vue';

const policyholders = ref([]);
const policies = ref([]);
const claims = ref([]);
const loading = ref(false);
const error = ref(null);
const selectedDataType = ref('policyholders');
const showList = ref(false);

const fetchSelectedData = async () => {
  try {
    loading.value = true;
    error.value = null;
    showList.value = true;

    switch(selectedDataType.value) {
      case 'policyholders':
        policyholders.value = await fetchPolicyholders();
        break;
      case 'policies':
        policies.value = await fetchPolicies();
        break;
      case 'claims':
        claims.value = await fetchClaims();
        break;
    }
  } catch (err) {
    error.value = err.message;
    console.error("Fetch error:", err);
  } finally {
    loading.value = false;
  }
};
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
      <select v-model="selectedDataType" @change="showList = false">
        <option value="policyholders">Policyholders</option>
        <option value="policies">Policies</option>
        <option value="claims">Claims</option>
      </select>
      
      <button @click="fetchSelectedData" :disabled="loading">
        {{ loading ? 'Fetching...' : 'Fetch Data' }}
      </button>
    </div>

    <div v-if="error" class="error-message">
      Error: {{ error }}
    </div>

    <div v-if="loading" class="loading">
      Loading data...
    </div>

    <div v-if="showList">
      <div v-if="selectedDataType === 'policyholders' && policyholders.length">
        <h2>Policyholders ({{ policyholders.length }})</h2>
        <ul>
          <li v-for="holder in policyholders" :key="holder.id">
            #{{ holder.id }} - {{ holder.name }} ({{ holder.contactInfo }})
          </li>
        </ul>
      </div>

      <div v-if="selectedDataType === 'policies' && policies.length">
        <h2>Policies ({{ policies.length }})</h2>
        <ul>
          <li v-for="policy in policies" :key="policy.id">
            Policy #{{ policy.id }} - ${{ policy.policyAmount }} (Holder: {{ policy.policyholderId }})
          </li>
        </ul>
      </div>

      <div v-if="selectedDataType === 'claims' && claims.length">
        <h2>Claims ({{ claims.length }})</h2>
        <ul>
          <li v-for="claim in claims" :key="claim.id">
            Claim #{{ claim.id }} - ${{ claim.amount }} (Policy: {{ claim.policyId }})
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Add dropdown styles */
select {
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  background-color: white;
}

/* Keep existing styles */
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