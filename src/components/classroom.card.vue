<template>
    <div class="classroom-card">
      <h2>{{ classroom.levelName }}</h2>
      <span>
      Principal :
      {{ classroom.principalTeacher ? `${classroom.principalTeacher.firstName} ${classroom.principalTeacher.lastName}` : 'Aucun prof' }}
      </span><br />
      <router-link :to="{ name: 'students-by-class', params: { id: classroom.id }, query: { name: classroom.levelName } }" class="view-link">
        Voir les élèves de la classe
      </router-link>
      <div v-if="authService.isLoggedIn.value" class="actions">
        <button @click="$emit('edit', classroom)"><font-awesome-icon icon="edit" /></button>
        <button @click="$emit('delete', classroom)"><font-awesome-icon icon="trash" /></button>
      </div>
    </div>
    
  </template>
  
  <script setup lang="ts">
  import type { Classroom } from '../models/classroom';
  import { authService } from '../services/auth.service';
  
  defineProps<{ classroom: Classroom }>();
  </script>
  
  <style scoped>
  .classroom-card {
    background-color: #fff;
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    width: 250px;
    position: relative;
  }
  
  .view-link {
    font-size: 0.9rem;
    color: #007bff;
    text-decoration: none;
  }
  
  .view-link:hover {
    text-decoration: underline;
  }
  .actions {
    position: absolute;
    right: 5px;
    top: 10px;
    gap: 10px;
}
button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
}

button:hover {
  color: #d93025;
}
  </style>
  