<template>
  <div class="card">
    <router-link :to="{ path: `/students/${student.id}`, query: { className: getClassName(student.classId)  } }" class="card-content">
      
      <h3>{{ student.firstName }} {{ student.lastName }}</h3>
      <p>Genre : {{ student.gender }}</p>
      <p>Classe : {{ getClassName(student.classId) }}</p>
    </router-link>
    <div v-if="authService.isLoggedIn.value" class="actions">
        <button @click="$emit('edit', student)"><font-awesome-icon icon="edit" /></button>
        <button @click="$emit('delete', student)"><font-awesome-icon icon="trash" /></button>
      </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Student } from '../models/student';
import { authService } from '../services/auth.service';

defineProps<{
  student: Student;
  getClassName: (id: number) => string;
}>();
</script>

<style scoped>
.card {
  position: relative;
  display: block;
  padding: 1.5rem;
  border-radius: 0.75rem;
  background-color: #f9f9f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  min-width: 250px;
}
.actions {
  position: absolute;
  right: 5px;
  top: 10px;
  gap: 10px;
}

.card-content {
  display: block;
  text-decoration: none;
  color: inherit;
}

</style>
