<template>
    <div class="modal-backdrop" @click.self="emit('close')">
      <div class="modal">
        <h2>{{ initial ? 'Modifier la matière' : 'Ajouter une matière' }}</h2>
        <form @submit.prevent="save">
          <label>
            Nom de la matière:
            <input v-model="name" required />
          </label>
  
          <label for="teacher-select">Ajouter un prof :</label>
                <select id="teacher-select" @change="addTeacher($event)">
                <option disabled selected value="">-- Choisir un prof --</option>
                <option v-for="s in teachers" :key="s.id" :value="s.id">{{ s.firstName }} {{ s.lastName }}</option>
                </select>

                <div class="selected-teachers">
                <div
                    class="subject-card"
                    v-for="subject in selectedTeachers"
                    :key="subject.id"
                >
                    {{ subject.lastName }}
                    <button @click="removeTeacher(subject.id)">❌</button>
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
  const props = defineProps<{ initial: Subject | null }>();
  
  const name = ref('');
  const teachers = ref<Teacher[]>([]);
  const selectedTeachers = ref<Teacher[]>([]);
  
  watch(() => props.initial, (val) => {
    name.value = val?.name || '';

  }, { immediate: true });

  onMounted(async () => {
  teachers.value = await teacherService.getAll();
  getSelectedTeachers();

});

const addTeacher = (event: Event) => {
  const id = Number((event.target as HTMLSelectElement).value);
  const teacher = teachers.value.find(s => s.id === id);
  if (teacher && !selectedTeachers.value.some(s => s.id === id)) {
    selectedTeachers.value.push(teacher);
  }
  (event.target as HTMLSelectElement).value = '';
};

const removeTeacher = (id: number) => {
  selectedTeachers.value = selectedTeachers.value.filter(s => s.id !== id);
};
const getSelectedTeachers = async () => {
  if (!props.initial?.id) return;

  try {
    const teachers = await teacherService.getBySubject(props.initial.id);
    selectedTeachers.value = teachers;
  } catch (error) {
    console.error('Erreur lors du chargement des enseignants par matière', error);
  }
};

  const save = async () => {

    if (props.initial) {

      await subjectService.update(props.initial.id,{
        ...props.initial,
        name: name.value,
        teacherSubjects: selectedTeachers.value.map(teacher => ({
                        teacherId: teacher.id,
                        subjectId: props.initial?.id ?? 0 // ou une autre valeur par défaut
                        }))
      });
    } else {
      await subjectService.create({
          name: name.value,
          id: 0,
          teacherSubjects: selectedTeachers.value.map(teacher => ({
                teacherId: teacher.id,
                subjectId: 0 // ou une autre valeur par défaut
                }))
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
  