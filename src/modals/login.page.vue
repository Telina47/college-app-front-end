<template>
    <div class="modal-backdrop" @click.self="close">
      <div class="modal">
        <h2>Connexion</h2>
        <form @submit.prevent="login">
          <label>
            Pseudo :
            <input v-model="username" required />
          </label>
          <label>
            Mot de passe :
            <input v-model="password" type="password" required />
          </label>
          <div class="actions">
            <button type="submit">Se connecter</button>
            <button type="button" @click="close">Annuler</button>
          </div>
        </form>
        <p v-if="error" class="error">{{ error }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { authService } from '../services/auth.service';
  import { useRouter } from 'vue-router';
  
  const emit = defineEmits(['close', 'loggedIn']);
  
  const username = ref('');
  const password = ref('');
  const error = ref('');
  const router = useRouter();
  
  const login = async () => {
    try {
      await authService.login(username.value, password.value);
      emit('loggedIn');
      close();
    } catch (e) {
      error.value = 'Identifiants incorrects';
    }
  };
  
  const close = () => emit('close');
  </script>
  
  <style scoped>
/* === BACKDROP === */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

/* === MODAL === */
.modal {
  background: #fff;
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  min-width: 320px;
  max-width: 500px;
  width: 100%;
}

/* === FORM === */
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
  color: #333;
}

input {
  padding: 0.5rem;
  margin-top: 0.25rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  font-size: 1rem;
}

/* === ACTIONS === */
.actions {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

button[type="submit"] {
  background-color: #007bff;
  color: white;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

button[type="button"] {
  background-color: #e0e0e0;
}

button[type="button"]:hover {
  background-color: #c6c6c6;
}

/* === ERROR === */
.error {
  color: #d93025;
  font-size: 0.9rem;
  margin-top: 1rem;
}

  </style>
  