<template>
    <div class="app-card">
        <div class="app-card-content">
            <slot />
        </div>
      
    </div>
  </template>
  
  <script setup lang="ts">
  // Composant réutilisable d'encapsulation de carte
  </script>
  
  <style scoped>
  .app-card {
  position: relative;
  display: inline-block;
  padding: 1.5rem;
  border-radius: 0.75rem;
  background-color: #f9f9f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  width: 250px;
  margin: 10px;   
}

.app-card-content {
  display: block;
  text-decoration: none;
  color: inherit;
}
  </style>