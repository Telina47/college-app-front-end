<template>
  <div class="classrooms-page">
    <h1>Liste des classes</h1>
    <div v-if="authService.isLoggedIn.value" class="add-button">
      <button class="add-button" @click="openModal(null)"><font-awesome-icon icon="plus" /> Ajouter une classe</button>
    </div>
    <br/>
    <div class="classroom-list">
      <ClassroomCard
        v-for="classroom in classrooms"
        :key="classroom.id"
        :classroom="classroom"
        :editable="authService.isLoggedIn.value"
        @edit="openModal"
        @delete="confirmDelete"
      />
    </div>

    <ClassroomModal
      v-if="showModal"
      :initial="selectedClass"
      @close="closeModal"
      @saved="reload"
    />

    <ConfirmModal
      v-if="toDelete"
      message="Supprimer cette classe ?"
      @confirm="deleteClass"
      @cancel="toDelete = null"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ClassroomCard from '../components/classroom.card.vue';
import { classroomService } from '../services/classroom.service';
import type { Classroom } from '../models/classroom';
import { authService } from '../services/auth.service';
import ClassroomModal from '../modals/classroom.modal.vue';
import ConfirmModal from '../modals/confirm.modal.vue';

const classrooms = ref<Classroom[]>([]);
const showModal = ref(false);
const selectedClass = ref<Classroom | null>(null);
const toDelete = ref<Classroom | null>(null);

const load = async () => {
  classrooms.value = await classroomService.getAll();
};

const reload = async () => {
  await load();
  closeModal();
};

const openModal = (cls: Classroom | null) => {
  selectedClass.value = cls;
  showModal.value = true;
};

const closeModal = () => {
  selectedClass.value = null;
  showModal.value = false;
};

const confirmDelete = (cls: Classroom) => {
  toDelete.value = cls;
};

const deleteClass = async () => {
  if (toDelete.value) {
    await classroomService.remove(toDelete.value.id);
    toDelete.value = null;
    load();
  }
};
onMounted(load);
</script>

<style scoped>
.classrooms-page {
  position: relative;
  padding: 2rem;
  text-align: center;
  margin: 0 auto;
}

.classroom-list {
  align-content: center;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
