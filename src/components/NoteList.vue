<script setup>
import { computed, ref } from 'vue'
import NoteItem from './NoteItem.vue'
import NoteEditor from '@/components/NoteEditor.vue';
import Note from '@/components/Note.vue';
import { useNotesStore } from '@/stores/notes'

const store = useNotesStore()
const currentNote = ref(null);
const searchQuery = ref('');
const currentCategory = ref('');
const showAddNoteModal = ref(false);

store.fetchNotes()

const editNote = (note) => {
  currentNote.value = note;
};

const removeNote = (note) => {
  console.log(note);
  store.removeNote(note);
};

const fetchNotes = () => {
  store.fetchNotes();
};
/** Search */
const filteredNotes = computed(() => {
  return store.notes.filter(note => {
    const matchByCategory = note.category.toLowerCase().includes(currentCategory.value.toLowerCase());
    const matchSearch = note.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      note.category.toLowerCase().includes(searchQuery.value.toLowerCase());

    return matchByCategory && matchSearch;
  });
});

/** Get unique categories */
const uniqueCategories = computed(() => {
  const categories = [];
  store.notes.forEach(note => {
    if (!categories.includes(note.category)) {
      categories.push(note.category);
    }
  });

  return categories;
});

/** Filtrer by categories */
const toggleCategoryFilter = (category) => {
  currentCategory.value = category;
  filteredNotes;
};

// const notes = computed(() => store.notes);

</script>

<template>
  <div>
    <input type="text" v-model="searchQuery" placeholder="Rechercher dans les notes..."
      class="mb-4 p-2 border border-gray-300 rounded-lg" />
    <div class="flex justify-between items-center mb-4">
      <div class="add-note"><button @click="showAddNoteModal = true"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"><span
            class="emoji mr-2">📝</span>
          Ajouter une Note
        </button></div>
      <div class="categories">
        <button @click="toggleCategoryFilter('')"
          class="m-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Toutes
        </button>
        <button v-for="category in uniqueCategories" :key="category" @click="toggleCategoryFilter(category)"
          class="m-1 bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded">
          {{ category }}
        </button>
      </div>
    </div>
    <div class="space-y-4">
      <NoteItem v-for="note in filteredNotes" :key="note.id" :note="note" @editNote="editNote" @removeNote="removeNote" />
      <NoteEditor v-if="currentNote" :note="currentNote" @update="fetchNotes" @close="currentNote = null" />
      <Note v-if="showAddNoteModal" @closeModal="showAddNoteModal = false" />
    </div>
  </div>
</template>

<style scoped></style>
