<template>
    <div class="students-by-class">
      <h1>Les élèves de la classe de {{ className }}</h1>
      <div v-if="students.length === 0">
        <p>Aucun élève dans cette classe.</p>
      </div>
      <div v-else class="student-list">
        <StudentCard
          v-for="student in students"
          :key="student.id"
          :student="student"
          :get-class-name="getClassName"
          @edit="noactions"
          @delete="noactions"
        />
      </div>
      <ConfirmModal
      v-if="showModal"
      message="Cette action ne peut être faite ici!!!"
      @confirm="closeModal"
      @cancel="closeModal"
    />
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import StudentCard from '../components/student.card.vue';
  import { studentService } from '../services/student.service';
  import type { Student } from '../models/student';
import ConfirmModal from '../modals/confirm.modal.vue';
  
  const route = useRoute();
  const students = ref<Student[]>([]);
  const className = ref<string>('');
  const showModal = ref(false);
  const load =(async ()=>{
    const classId = Number(route.params.id);
    className.value = (route.query.name as string) || `#${classId}`;
    students.value = await studentService.getByClass(classId);
  })
  onMounted(load);
  const getClassName =():string =>{
    return className.value;
  };
  const noactions =()=>{
    showModal.value =true;
  }
  const closeModal=()=>{
    showModal.value =false;
  }
  </script>
  
  <style scoped>
  .students-by-class {
    padding: 2rem;
    text-align: center;
    margin: 0 auto;
  }
  
  .student-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  </style>
  