<template>
    <div v-if="snackbarVisible" class="snackbar" :class="snackbarType">
      {{ snackbarMessage }}
    </div>
  </template>
  
  <script setup lang="ts">
import { useSnackbar } from '../composables/usesnackbar';


  
  const { snackbarMessage, snackbarType, snackbarVisible } = useSnackbar();
  </script>
  
  <style scoped>
  .snackbar {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    color: white;
    font-weight: bold;
    z-index: 9999;
  }
  .snackbar.success {
    background-color: #2ecc71;
  }
  .snackbar.error {
    background-color: #e74c3c;
  }
  </style>
  