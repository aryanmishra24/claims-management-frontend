import axios from "axios";

const API_BASE_URL = "https://your-backend-url.com"; // Replace with your Fastify backend URL
const API_KEY = "your_api_key"; // Replace with your API key

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
