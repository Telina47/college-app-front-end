<template>
    <div class="modal-backdrop" @click.self="emit('close')">
      <div class="modal">
        <h2>{{ initial ? 'Modifier la classe' : 'Ajouter une classe' }}</h2>
        <form @submit.prevent="save">
          <label>
            Nom du niveau :
            <input v-model="levelName" required />
          </label>
  
          <label>
            Professeur principal :
            <select v-model="principalId" required>
              <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">
                {{ teacher.firstName }} {{ teacher.lastName }}
              </option>
            </select>
          </label>
  
          <div class="actions">
            <button type="submit">Enregistrer</button>
            <button type="button" @click="emit('close')">Annuler</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, onMounted } from 'vue';
  import { classroomService } from '../services/classroom.service';
  import { teacherService } from '../services/teacher.service';
  import type { Classroom } from '../models/classroom';
  import type { Teacher } from '../models/teacher';
  
  const emit = defineEmits(['close', 'saved']);
  const props = defineProps<{ initial: Classroom | null }>();
  
  const levelName = ref('');
  const principalId = ref<number | null>(null);
  const teachers = ref<Teacher[]>([]);
  
  watch(() => props.initial, (val) => {
    levelName.value = val?.levelName || '';
    principalId.value = val?.principalTeacher?.id || null;
  }, { immediate: true });
  
  onMounted(async () => {
    teachers.value = await teacherService.getAll();
  });
  
  const save = async () => {
    if (!principalId.value) return;
  
    if (props.initial) {
        props.initial.principalTeacher =null;
      await classroomService.update(props.initial.id,{
        ...props.initial,
        levelName: levelName.value,
        principalTeacherId: principalId.value
      });
    } else {
      await classroomService.create({
          levelName: levelName.value,
          id: 0,
          principalTeacherId: principalId.value,
          principalTeacher: null
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
  