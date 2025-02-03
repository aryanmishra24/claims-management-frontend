import axios from 'axios';

// Use API base URL from environment variables
const API_BASE = "https://claims-management.mishraaryan350.workers.dev";

// Function to fetch data with API key
export const fetchData = async (endpoint) => {
  try {
    // Fetch API key from localStorage/sessionStorage (assuming it's stored after login)
    const apiKey = "6f4f79cac51e76536abc47132fa51cc5f35d97375f70da3280779639d568ad6a"; // Make sure it's securely stored

    if (!apiKey) {
      throw new Error("Missing API key! Please log in again.");
    }

    const response = await axios.get(`${API_BASE}${endpoint}`, {
      headers: {
        'x-api-key': apiKey, // Use dynamic API key
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (err) {
    throw new Error(err.response?.data?.error || err.message);
  }
};

// Fetch Policyholders
export const fetchPolicyholders = async () => {
  return await fetchData('/policyholders');
};

// Fetch Policies
export const fetchPolicies = async () => {
  return await fetchData('/policies');
};

// Fetch Claims
export const fetchClaims = async () => {
  return await fetchData('/claims');
};