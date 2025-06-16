<template>
    <div class="confirm-backdrop" @click.self="emit('cancel')">
      <div class="confirm-modal">
        <p class="message">{{ message }}</p>
        <div class="actions">
          <button class="confirm" @click="emit('confirm')">Confirmer</button>
          <button class="cancel" @click="emit('cancel')">Annuler</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps<{ message: string }>();
  const emit = defineEmits(['confirm', 'cancel']);
  </script>
  
  <style scoped>
  .confirm-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .confirm-modal {
    background: white;
    padding: 1.5rem;
    border-radius: 0.5rem;
    min-width: 300px;
    max-width: 90%;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  }
  
  .message {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  
  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
  
  button.confirm {
    background-color: #d93025;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    cursor: pointer;
  }
  
  button.cancel {
    background-color: #ccc;
    color: #000;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    cursor: pointer;
  }
  </style>
  