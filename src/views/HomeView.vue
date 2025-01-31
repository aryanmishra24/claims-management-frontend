<template>
    <div>
      <h1>Claims & Policies Management</h1>
      <nav>
        <router-link to="/policyholders">Policyholders</router-link> |
        <router-link to="/policies">Policies</router-link> |
        <router-link to="/claims">Claims</router-link>
      </nav>
    </div>
  </template>
  
  <style scoped>
  nav {
    margin-top: 10px;
  }
  nav a {
    margin-right: 15px;
    text-decoration: none;
    color: blue;
  }
  </style>
  