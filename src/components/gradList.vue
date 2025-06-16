<template>
    <div class="grade-list">
      <h3>Notes et appréciations</h3>
      <ul>
        <li v-for="grade in grades" :key="grade.id">
          <strong>{{ getSubjectName(grade.subjectId) }}</strong> :
          {{ grade.value }}/20 —
          <em>{{ getAppreciationText(grade.subjectId) }}</em>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import type { Grade } from '../models/grade';
  import type { Appreciation } from '../models/appreciation';
  import type { Subject } from '../models/subject';
import { subjectService } from '../services/subject.service';

  
  const props = defineProps<{
    grades: Grade[];
    appreciations: Appreciation[];
  }>();
  
  const subjects = ref<Subject[]>([]);
  
  onMounted(async () => {
    subjects.value = await subjectService.getAll();
  });
  
  const getSubjectName = (subjectId: number): string => {
    return subjects.value.find(s => s.id === subjectId)?.name || 'Inconnu';
  };
  
  const getAppreciationText = (subjectId: number): string => {
    return props.appreciations.find(a => a.subjectId === subjectId)?.text || '—';
  };
  </script>
  
  <style scoped>
  ul {
    margin: 0.5rem 0;
    padding-left: 1.25rem;
  }
  </style>
  