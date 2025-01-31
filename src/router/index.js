import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PolicyholderForm from "../components/PolicyholderForm.vue";
import PolicyForm from "../components/PolicyForm.vue";
import ClaimForm from "../components/ClaimForm.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/policyholders", component: PolicyholderForm },
  { path: "/policies", component: PolicyForm },
  { path: "/claims", component: ClaimForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
