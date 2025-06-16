<template>
    <div class="subjects-by-teacher">
      <h1>Matières enseignées par {{ teacherName }}</h1>
      <div v-if="subjects.length === 0">
        <p>Ce professeur n'enseigne aucune matière.</p>
      </div>
      
     <div v-else class="subject-grid">
      <AppCard v-for="subject in subjects" :key="subject.id" title="Voir les profs">
        <router-link
          :to="{ name: 'teachers-by-subject', params: { id: subject.id }, query: { name: subject.name } }"
        >
          {{ subject.name }}
        </router-link>
      </AppCard>
    </div>
      
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { subjectService } from '../services/subject.service';
  import type { Subject } from '../models/subject';
import AppCard from '../components/app.card.vue';
  
  const route = useRoute();
  const teacherId = Number(route.params.id);
  const teacherName = ref(route.query.name as string || `#${teacherId}`);
  const subjects = ref<Subject[]>([]);
  
  onMounted(async () => {
    subjects.value = await subjectService.getByTeacher(teacherId);
  });
  </script>
  
  <style scoped>
  .subjects-by-teacher {
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
  .subject-grid {
    align-content: center;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  }
  </style>
  