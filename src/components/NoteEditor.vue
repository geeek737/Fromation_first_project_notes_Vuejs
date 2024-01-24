<script setup>
import { watch, ref, defineEmits } from 'vue'
import { useNotesStore } from '@/stores/notes'

const props = defineProps({
  note: Object
});

const emits = defineEmits(['update', 'close']);
const store = useNotesStore()
const editedNote = ref({ ...props.note });

watch(() => props.note, (newVal) => {
  editedNote.value = { ...newVal };
});

const submitForm = async () => {
  await store.updateNote(editedNote.value);
  emits('update');
};
</script>

<template>
  <!-- Modal pour la mise à jour -->
  <div v-if="note"
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
    <div class="bg-white p-5 rounded-lg shadow-lg w-1/2">
      <h2 class="text-xl font-bold mb-2">Modifier la note</h2>
      <div>
        <label class="block text-gray-700 text-sm font-bold mb-2" for="title">Titre</label>
        <input v-model="editedNote.title" type="text" id="title" placeholder="Entrez un titre"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div class="mt-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="content">Contenu</label>
        <textarea v-model="editedNote.content" id="content" placeholder="Entrez le contenu"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline h-40"></textarea>
      </div>
      <div class="flex justify-end">
        <button @click="$emit('close')"
          class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
          Annuler
        </button>
        <button @click="submitForm"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Enregistrer
        </button>
      </div>
    </div>
  </div>
</template>
