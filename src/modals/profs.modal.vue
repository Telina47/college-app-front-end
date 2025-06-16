<template>
    <div class="modal-backdrop" @click.self="emit('close')">
      <div class="modal">
        <h2>{{ initial ? 'Modifier le prof' : 'Ajouter un prof' }}</h2>
        <form @submit.prevent="save">
            <label>
            Prénom:
            <input v-model="firstName" required />
          </label>
          <label>
            Nom:
            <input v-model="lastName" required />
          </label>
          <label>
            Genre:
            <select v-model="gender" required>
              <option  key="M" value="M" :selected="gender=='M'">Masculin
              </option>
              <option  key="F" value="F" :selected="gender=='F'">Feminin
            </option>
            </select>
          </label>
          <label for="teacher-select">Ajouter une matière :</label>
                <select id="teacher-select" @change="addSubject($event)">
                <option disabled selected value="">-- Choisir une matière--</option>
                <option v-for="s in subjects" :key="s.id" :value="s.id">{{ s.name }}</option>
                </select>

                <div class="selected-teachers">
                <div
                    class="subject-card"
                    v-for="subject in selectedSubjects"
                    :key="subject.id"
                >
                    {{ subject.name }}
                    <button @click="removeSubject(subject.id)">❌</button>
                </div>
                </div>
  
          <div class="actions">
            <button type="submit">Enregistrer</button>
            <button type="button" @click="emit('close')">Annuler</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref, watch} from 'vue';

import type { Subject } from '../models/subject';
import { subjectService } from '../services/subject.service';
import type { Teacher } from '../models/teacher';
import { teacherService } from '../services/teacher.service';
  
  const emit = defineEmits(['close', 'saved']);
  const props = defineProps<{ initial: Teacher | null }>();
  
  const lastName = ref('');
  const firstName = ref('');
  const gender =ref('');
  const subjects = ref<Subject[]>([]);
  const selectedSubjects = ref<Subject[]>([]);
  
  watch(() => props.initial, (val) => {
    lastName.value = val?.lastName || '';
    firstName.value = val?.firstName || '';
    gender.value =val?.gender ||'M';

  }, { immediate: true });

  onMounted(async () => {
  subjects.value = await subjectService.getAll();
  getSelectedSubjects();

});

const addSubject = (event: Event) => {
  const id = Number((event.target as HTMLSelectElement).value);
  const subject = subjects.value.find(s => s.id === id);
  if (subject && !selectedSubjects.value.some(s => s.id === id)) {
    selectedSubjects.value.push(subject);
  }
  (event.target as HTMLSelectElement).value = '';
};

const removeSubject = (id: number) => {
  selectedSubjects.value = selectedSubjects.value.filter(s => s.id !== id);
};
const getSelectedSubjects = async () => {
  if (!props.initial?.id) return;

  try {
    const teachers = await subjectService.getByTeacher(props.initial.id);
    selectedSubjects.value = teachers;
  } catch (error) {
    console.error('Erreur lors du chargement des enseignants par matière', error);
  }
};

  const save = async () => {

    if (props.initial) {

      await teacherService.update(props.initial.id,{
        ...props.initial,
        lastName: lastName.value,
        firstName:firstName.value,
        gender :gender.value as 'M'|'F',
        teacherSubjects:selectedSubjects.value.map(sub => ({
                        teacherId:  props.initial?.id ?? 0,
                        subjectId:sub.id
                        }))
      });
    } else {
      await teacherService.create({
          lastName: lastName.value,
          firstName: firstName.value,
          teacherSubjects: selectedSubjects.value.map(sub => ({
              teacherId: 0,
              subjectId: sub.id
          })),
          id: 0,
          gender: gender.value as 'M'|'F'
      });
    }
    emit('saved');
  };
  </script>
  <style scoped>
  /* === BACKDROP === */
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  /* === MODAL === */
  .modal {
    background: #fff;
    padding: 2rem;
    border-radius: 0.75rem;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    min-width: 320px;
    max-width: 500px;
    width: 100%;
  }
  
  /* === FORM === */
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  label {
    display: flex;
    flex-direction: column;
    font-weight: 500;
    color: #333;
  }
  
  input {
    padding: 0.5rem;
    margin-top: 0.25rem;
    border: 1px solid #ccc;
    border-radius: 0.375rem;
    font-size: 1rem;
    height: 15px;
  }
  select{
    height: 30px;
  }
  
  /* === ACTIONS === */
  .actions {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  
  button[type="submit"] {
    background-color: #007bff;
    color: white;
  }
  
  button[type="submit"]:hover {
    background-color: #0056b3;
  }
  
  button[type="button"] {
    background-color: #e0e0e0;
  }
  
  button[type="button"]:hover {
    background-color: #c6c6c6;
  }
  
  /* === ERROR === */
  .error {
    color: #d93025;
    font-size: 0.9rem;
    margin-top: 1rem;
  }
  
    </style>
  