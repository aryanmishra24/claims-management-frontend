<script setup>
import ClaimForm from './components/ClaimForm.vue'
import PolicyholderForm from './components/PolicyholderForm.vue'
import PolicyForm from './components/PolicyForm.vue'
</script>

<template>
  <header>

    <div class="wrapper">
      <PolicyholderForm />
      <PolicyForm />
      <ClaimForm />
    </div>
  </header>

  <main>
    <!-- You can add any additional content here if needed -->
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px; /* Space between the forms */
  margin-top: 20px;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  
}
</style>
