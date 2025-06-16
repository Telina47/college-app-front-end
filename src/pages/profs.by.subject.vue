<template>
    <div class="professors-by-subject">
      <h1>Professeurs enseignant {{ subjectName }}</h1>
      <div v-if="teachers.length === 0">
        <p>Aucun professeur pour cette matière.</p>
      </div>
      <div v-else class="teacher-grid">
      <AppCard v-for="teacher in teachers" :key="teacher.id" title="Voir les matières">
        <router-link
          :to="{ name: 'subjects-by-teacher', params: { id: teacher.id }, query: { name: teacher.firstName + ' ' + teacher.lastName } }"
        >
          {{ teacher.firstName }} {{ teacher.lastName }}
        </router-link>
      </AppCard>
    </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { teacherService } from '../services/teacher.service';
  import type { Teacher } from '../models/teacher';
import AppCard from '../components/app.card.vue';
  
  const route = useRoute();
  const subjectId = Number(route.params.id);
  const subjectName = ref(route.query.name as string || `#${subjectId}`);
  const teachers = ref<Teacher[]>([]);
  
  onMounted(async () => {
    teachers.value = await teacherService.getBySubject(subjectId);
  });
  </script>
  
  <style scoped>
  .professors-by-subject {
    padding: 2rem;
    text-align: center;
    margin: 0 auto;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin: 0.5rem 0;
  }
  
  a {
    color: #007bff;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>
  