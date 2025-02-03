import axios from "axios";

const API_BASE_URL = "https://claims-management.mishraaryan350.workers.dev/"; // Replace with your Fastify backend URL
const API_KEY = "6f4f79cac51e76536abc47132fa51cc5f35d97375f70da3280779639d568ad6a"; // Replace with your API key

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "x-api-key": API_KEY,
    "Content-Type": "application/json",
  },
});

export default {
  createPolicyholder(data) {
    return apiClient.post("/policyholders", data);
  },
  createPolicy(data) {
    return apiClient.post("/policies", data);
  },
  createClaim(data) {
    return apiClient.post("/claims", data);
  },
};
