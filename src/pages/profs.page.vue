<template>
    <div class="professors">
      <h1>Liste de tous les professeurs</h1>
      <div v-if="authService.isLoggedIn.value" class="add-button">
      <button class="add-button" @click="openModal(null)"><font-awesome-icon icon="plus" />Ajouter un prof</button>
    </div>
    <br/>
      <div v-if="teachers.length === 0">
        <p>Aucun professeur</p>
      </div>
      <div v-else class="teacher-grid">
      <AppCard v-for="teacher in teachers" :key="teacher.id" title="Voir les matières">
        <router-link
          :to="{ name: 'subjects-by-teacher', params: { id: teacher.id }, query: { name: teacher.firstName + ' ' + teacher.lastName } }"
        >
          {{ teacher.firstName }} {{ teacher.lastName }}
        </router-link>
        <div v-if="authService.isLoggedIn.value" class="actions">
        <button @click="openModal(teacher)"><font-awesome-icon icon="edit" /></button>
        <button @click="confirmDelete(teacher)"><font-awesome-icon icon="trash" /></button>
      </div>
      </AppCard>
    </div>
    <ProfsModal
      v-if="showModal"
      :initial="selectedTeacher"
      @close="closeModal"
      @saved="reload"
    />
    <ConfirmModal
      v-if="toDelete"
      message="Supprimer ce prof ?"
      @confirm="deleteTeacher"
      @cancel="toDelete = null"
    />
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { teacherService } from '../services/teacher.service';
  import type { Teacher } from '../models/teacher';
  import AppCard from '../components/app.card.vue';
  import { authService } from '../services/auth.service';
import ProfsModal from '../modals/profs.modal.vue';
import ConfirmModal from '../modals/confirm.modal.vue';

    const teachers = ref<Teacher[]>([]);
    const selectedTeacher = ref<Teacher |null>(null);
    const showModal = ref<boolean>(false);
    const toDelete = ref<Teacher|null>(null);
    const load = (async ()=>{
        teachers.value = await teacherService.getAll();
        });
        const closeModal = () => {
        selectedTeacher.value = null;
        showModal.value = false;
        };
        const reload = async () => {
        await load();
        closeModal();
        };
        const confirmDelete = (cls: Teacher) => {
        toDelete.value = cls;
        };
        const deleteTeacher = async () => {
        if (toDelete.value) {
            await teacherService.remove(toDelete.value.id);
            toDelete.value = null;
            load();
        }
        };
        const openModal = (cls: Teacher | null) => {
            selectedTeacher.value = cls;
            showModal.value = true;
            };
        onMounted(load);
  </script>
  
  <style scoped>
  .professors {
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
  