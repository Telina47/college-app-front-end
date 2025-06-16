<template>
    <div class="students-page">
      <h2>Liste de tous les élèves</h2>
      <div v-if="authService.isLoggedIn.value" class="add-button">
      <button class="add-button" @click="openModal(null)"><font-awesome-icon icon="plus" /> Ajouter un élève</button>
      </div>
      <br/>
      <div v-if="loading">Chargement...</div>
      <div v-else class="student-list">
        <StudentCard
          v-for="student in students"
          :key="student.id"
          :student="student"
          :get-class-name="getClassName"
          @edit="openModal"
          @delete="confirmDelete"
        />
      </div>
      <StudentModal
      v-if="showModal"
      :initial="selectedStudent"
      @close="closeModal"
      @saved="reload"
    />

    <ConfirmModal
      v-if="toDelete"
      message="Supprimer cet élève ?"
      @confirm="deleteStudent"
      @cancel="toDelete = null"
    />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { studentService } from '../services/student.service';
  import { classroomService } from '../services/classroom.service';
  import type { Student } from '../models/student';
  import type { Classroom } from '../models/classroom';
  import StudentCard from '../components/student.card.vue';
import StudentModal from '../modals/student.modal.vue';
import ConfirmModal from '../modals/confirm.modal.vue';
import { authService } from '../services/auth.service';
  
  const students = ref<Student[]>([]);
  const classes = ref<Classroom[]>([]);
  const loading = ref(true);
  const showModal = ref(false);
  const selectedStudent = ref<Student | null>(null);
  const toDelete = ref<Student | null>(null);
  // Fonction utilisée dans les composants enfants
  const getClassName = (id: number): string => {
    return classes.value.find(c => c.id === id)?.levelName ?? `Classe #${id}`;
  };
  const load = async () =>{
    try {
      const [s, c] = await Promise.all([
        studentService.getAll(),
        classroomService.getAll()
      ]);
      students.value = s;
      classes.value = c;
    } finally {
      loading.value = false;
    }

  }
  const reload = async () => {
  await load();
  closeModal();
};
  
const openModal = (cls: Student | null) => {
  selectedStudent.value = cls;
  showModal.value = true;
};

const closeModal = () => {
  selectedStudent.value = null;
  showModal.value = false;
};

const confirmDelete = (cls: Student) => {
  toDelete.value = cls;
};

const deleteStudent = async () => {
  if (toDelete.value) {
    await studentService.remove(toDelete.value.id);
    toDelete.value = null;
    load();
  }
};
onMounted(load);
  </script>
  
  <style scoped>
  .students-page {
    padding: 2rem;
    text-align: center;
    margin: 0 auto;
  }
  
  .student-list {
  align-content: center;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
  </style>
  