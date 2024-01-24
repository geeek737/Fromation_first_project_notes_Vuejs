//Todo: add
<template>
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
        <div class="bg-white p-5 rounded-lg shadow-lg w-1/2">
            <h2 class="text-xl font-bold mb-2">Ajouter une nouvelle note</h2>
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-2" for="title">Titre</label>
                <input v-model="newNote.title" type="text" id="title" placeholder="Entrez un titre"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="mt-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="content">Contenu</label>
                <textarea v-model="newNote.content" id="content" placeholder="Entrez le contenu"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline h-40"></textarea>
            </div>
            <div class="flex justify-end">
                <button @click="closeModal"
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
                    Annuler
                </button>
                <button @click="submitNote"
                    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Ajouter
                </button>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { useNotesStore } from '@/stores/notes';

const emits = defineEmits(['close']);

const newNote = ref({
    title: '',
    content: '',
    category: 'test'
});

const store = useNotesStore();

const closeModal = () => {
    emits('closeModal');
};

const submitNote = async () => {
    if (newNote.value.title && newNote.value.content) {
        console.log(newNote.value)
        await store.addNote(newNote.value);
        closeModal();
        newNote.value = { title: '', content: '' };
    } else {
        alert("Veuillez remplir tous les champs.");
    }
};
</script>
  