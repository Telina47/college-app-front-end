<template>
  <div class="subjects-page">
    <h1>Liste des matières</h1>
    <div v-if="authService.isLoggedIn.value" class="add-button">
      <button class="add-button" @click="openModal(null)"><font-awesome-icon icon="plus" /> Ajouter une matière</button>
    </div>
    <br/>
    <div class="subject-grid">
      <AppCard v-for="subject in subjects" :key="subject.id" title="Voir les profs">
        <router-link
          :to="{ name: 'teachers-by-subject', params: { id: subject.id }, query: { name: subject.name } }"
        >

          {{ subject.name }}
        </router-link>

        <div v-if="authService.isLoggedIn.value" class="actions">
        <button @click="openModal(subject)"><font-awesome-icon icon="edit" /></button>
        <button @click="confirmDelete(subject)"><font-awesome-icon icon="trash" /></button>
      </div>
      </AppCard>
    </div>
    <SubjectModal
      v-if="showModal"
      :initial="selectedSubject"
      @close="closeModal"
      @saved="reload"
    />
    <ConfirmModal
      v-if="toDelete"
      message="Supprimer cette matière ?"
      @confirm="deleteSubject"
      @cancel="toDelete = null"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { subjectService } from '../services/subject.service';
import type { Subject } from '../models/subject';
import AppCard from '../components/app.card.vue';
import { authService } from '../services/auth.service';
import SubjectModal from '../modals/subject.modal.vue';
import ConfirmModal from '../modals/confirm.modal.vue';

const subjects = ref<Subject[]>([]);
const selectedSubject = ref<Subject |null>(null);
const showModal = ref<boolean>(false);
const toDelete = ref<Subject|null>(null);
const load = (async ()=>{
  subjects.value = await subjectService.getAll();
})
onMounted(load);
const openModal = (cls: Subject | null) => {
  selectedSubject.value = cls;
  showModal.value = true;
};
const closeModal = () => {
  selectedSubject.value = null;
  showModal.value = false;
};
const reload = async () => {
  await load();
  closeModal();
};
const confirmDelete = (cls: Subject) => {
  toDelete.value = cls;
};
const deleteSubject = async () => {
  if (toDelete.value) {
    await subjectService.remove(toDelete.value.id);
    toDelete.value = null;
    load();
  }
};
</script>

<style scoped>
.subjects-page {
  padding: 2rem;
  text-align: center;
  margin: 0 auto;
}

.subjects-page ul {
  list-style: none;
  padding: 0;
}

.subjects-page li {
  margin: 0.5rem 0;
}

.subjects-page a {
  color: #007bff;
  text-decoration: none;
}

.subjects-page a:hover {
  text-decoration: underline;
}
</style>
