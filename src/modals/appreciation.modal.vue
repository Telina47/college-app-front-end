<template>
    <div class="modal-backdrop" @click.self="emit('close')">
      <div class="modal">
        <h2>{{ initial ? 'Modifier l\'appreciation' : 'Ajouter une appréciation' }}</h2>
        <form @submit.prevent="save">
            <label>
                Appréciation:
                <input 
                    v-model="appreciationValue" 
                    required 
                />
                </label>
          
          
          <label for="subjets">Matière:</label>
                <select id="subjects" v-model="subjectId">
                <option disabled selected value="">-- Choisir une matière--</option>
                <option v-for="s in subjects" :key="s.id" :value="s.id">{{ s.name }}</option>
                </select>
  
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
import type { Appreciation } from '../models/appreciation';
import { appreciationService } from '../services/appreciation.service';
  
  const emit = defineEmits(['close', 'saved']);
  const props = defineProps<{ initial: Appreciation | null, studentId:number }>();
  
  const appreciationValue =ref('');
  const subjectId =ref(1);
  const subjects = ref<Subject[]>([]);

  
  watch(() => props.initial, (val) => {
    appreciationValue.value = val?.comment || '';
    subjectId.value =val?.subjectId||1;

  }, { immediate: true });

  onMounted(async () => {
  subjects.value = await subjectService.getAll();


});


  const save = async () => {

    if (props.initial) {

      await appreciationService.update(props.initial.id,{
        ...props.initial,
        comment:appreciationValue.value,
        subjectId:subjectId.value,
        studentId:props.studentId
      });
    } else {
      await appreciationService.create({
          comment: appreciationValue.value,
          subjectId: subjectId.value,
          id: 0,
          studentId: props.studentId
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
  