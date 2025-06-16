<template>
    <div class="modal-backdrop" @click.self="emit('close')">
      <div class="modal">
        <h2>{{ initial ? 'Modifier l\'élève' : 'Ajouter un élève' }}</h2>
        <form @submit.prevent="save">
          <label>
            Prénom :
            <input v-model="firstName" required />
          </label>
          <label>
            Nom :
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
          <label>
            Classe:
            <select v-model="classId" required>
              <option v-for="aclass in classes" :key="aclass.id" :value="aclass.id">
                {{ aclass.levelName }} 
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

    import type { Classroom } from '../models/classroom';

    import type { Student } from '../models/student';
    import { studentService } from '../services/student.service';
  
    const emit = defineEmits(['close', 'saved']);
    const props = defineProps<{ initial: Student | null }>();
    
    const lastName = ref('');
    const firstName = ref('');
    const gender =ref('');
    const classId = ref<number | null>(null);
    const classes = ref<Classroom[]>([]);
  
  watch(() => props.initial, (val) => {
    lastName.value = val?.lastName || '';
    firstName.value =val?.firstName || '';
    gender.value =val?.gender || '';
    classId.value = val?.classId || null;
  }, { immediate: true });
  
  onMounted(async () => {
    classes.value = await classroomService.getAll();
  });
  
  const save = async () => {
    if (!classId.value) return;
  
    if (props.initial) {
      await studentService.update(props.initial.id,{
        ...props.initial,
        lastName: lastName.value,
        firstName:firstName.value,
        classId: classId.value
      });
    } else {
      await studentService.create({
          firstName: firstName.value,
          lastName: lastName.value,
          id: 0,
          classId: classId.value,
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