<template>
  <div class="student-detail">
    <h2>{{ student?.firstName }} {{ student?.lastName }}</h2>
    <p>Genre : {{ student?.gender }}</p>
    <p>Classe : {{ className }}</p>

    <h3>Notes</h3>
    <div v-if="authService.isLoggedIn.value" class="add-button">
      <button class="add-button" @click="openGradeModal(null)">+ Ajouter une note</button>
    </div>
    <br/>
    <table class="stripped-table">
      <thead>
        <tr>
          <th>Matière</th>
          <th>Note</th>
          <th v-if="authService.isLoggedIn.value">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="grade in student?.grades" :key="grade.id">
          <td>{{ getSubjectName(grade.subjectId) }}</td>
          <td>{{ grade.value }}/20</td>
          <td v-if="authService.isLoggedIn.value">
            <button @click="openGradeModal(grade)"><font-awesome-icon icon="edit" /></button>
            <button @click="confirmDeleteGrade(grade)"><font-awesome-icon icon="trash" /></button>
          </td>
        </tr>
      </tbody>
    </table>

    <h3>Appréciations</h3>
    <div v-if="authService.isLoggedIn.value" class="add-button">
      <button class="add-button" @click="openAppreciationModal(null)">+ Ajouter une appreciation</button>
    </div>
    <br/>
    <table class="stripped-table">
      <thead>
        <tr>
          <th>Matière</th>
          <th>Commentaire</th>
          <th v-if="authService.isLoggedIn.value">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="app in student?.appreciations" :key="app.id">
          <td>{{ getSubjectName(app.subjectId) }}</td>
          <td>{{ app.comment }}</td>
          <td v-if="authService.isLoggedIn.value">
            <button @click="openAppreciationModal(app)"><font-awesome-icon icon="edit" /></button>
            <button @click="confirmDeleteAppreciation(app)"><font-awesome-icon icon="trash" /></button>
          </td>
        </tr>
      </tbody>
    </table>
    <GradeModal
      v-if="showGradModal"
      :initial="selectedGrad"
      :student-id="student?.id??0"
      @close="closeModal"
      @saved="reload"
    />

    <ConfirmModal
      v-if="gradToDelete"
      message="Supprimer cette note ?"
      @confirm="deleteGrade"
      @cancel="gradToDelete = null"
    />
    <AppreciationModal
      v-if="showAppreciationModal"
      :initial="selectedAppreciation"
      :student-id="student?.id??0"
      @close="closeModal"
      @saved="reload"
    />

    <ConfirmModal
      v-if="appreciationToDelete"
      message="Supprimer cette appréciation ?"
      @confirm="deleteAppreciation"
      @cancel="appreciationToDelete = null"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { studentService } from '../services/student.service';
import { subjectService } from '../services/subject.service';
import type { StudentDetail } from '../models/student.details';
import type { Subject } from '../models/subject';
import { authService } from '../services/auth.service';
import type { Grade } from '../models/grade';
import type { Appreciation } from '../models/appreciation';
import { gradeService } from '../services/grade.service';
import { appreciationService } from '../services/appreciation.service';
import GradeModal from '../modals/grade.modal.vue';
import ConfirmModal from '../modals/confirm.modal.vue';
import AppreciationModal from '../modals/appreciation.modal.vue';

const route = useRoute();
const student = ref<StudentDetail | null>(null);
const subjects = ref<Subject[]>([]);
const className = ref(route.query.className as string || '');
const showGradModal = ref<boolean>(false);
const gradToDelete = ref<Grade|null>(null);
const showAppreciationModal = ref<boolean>(false);
const appreciationToDelete = ref<Appreciation|null>(null);
const selectedGrad = ref<Grade | null>(null);
const selectedAppreciation = ref<Appreciation | null>(null);

const getSubjectName = (id: number) => {
  return subjects.value.find(s => s.id === id)?.name || `Matière #${id}`;
};
const load = (async () =>{
  const id = Number(route.params.id);
  student.value = await studentService.getById(id);
  subjects.value = await subjectService.getAll();
})
onMounted(load);
const reload = async () => {
  await load();
  closeModal();
};
const closeModal = () => {
  selectedAppreciation.value = null;
  selectedGrad.value =null;
  showGradModal.value = false;
  showAppreciationModal.value =false;
};

const openGradeModal = (cls: Grade | null) => {
  selectedGrad.value = cls;
  showGradModal.value = true;
};
const openAppreciationModal = (cls: Appreciation | null) => {
  selectedAppreciation.value = cls;
  showAppreciationModal.value = true;
};

const confirmDeleteGrade = (cls: Grade) => {
  gradToDelete.value = cls;
};

const deleteGrade = async () => {
  if (gradToDelete.value) {
    await gradeService.remove(gradToDelete.value.id);
    gradToDelete.value = null;
    load();
  }
  }
  const confirmDeleteAppreciation = (cls: Appreciation) => {
  appreciationToDelete.value = cls;
  };

const deleteAppreciation = async () => {
  if (appreciationToDelete.value) {
    await appreciationService.remove(appreciationToDelete.value.id);
    appreciationToDelete.value = null;
    load();
  }
}
</script>

<style scoped>
.student-detail {
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  max-width: 600px;
  margin: 2rem auto;
}
.stripped-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.stripped-table th,
.stripped-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.stripped-table tbody tr:nth-child(odd) {
  background-color: #f9f9f9;
}

button {
  margin-right: 0.5rem;
}
</style>
