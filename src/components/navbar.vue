<template>
    <nav class="navbar">
      <router-link to="/classrooms">Classes</router-link>
      <router-link to="/students">Élèves</router-link>
      <router-link to="/subjects" class="nav-link">Matières</router-link>
      <router-link to="/teachers" class="nav-link">Profs</router-link>
      <button  v-if="isAuthenticated" class="logout" @click="$emit('logout')">Se déconnecter</button>
      <button  v-else class="login" @click="$emit('login')">Se connecter</button>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { authService } from '../services/auth.service';
  const isAuthenticated = authService.isLoggedIn;
  console.log(authService.isAuthenticated());

  </script>
  
  <style scoped>

nav.navbar {
  background-color: #001f3f; /* bleu marine foncé */
  color: white;
  padding: 1rem;
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

nav.navbar a {
  color: white;
  text-decoration: none;
}

nav.navbar a:hover {
  text-decoration: underline;
}
  
  .router-link-active {
    font-weight: bold;
    text-decoration: underline;
  }
  
  .logout {
    margin-left: auto;
    background: #e74c3c;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
  }

  .login {
    margin-left: auto;
    background: #16878f;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  