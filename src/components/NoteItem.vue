<script setup>
const { note } = defineProps({
  note: {
    type: Object,
    required: true
  }
})

//TODO: add logic of edit and Delete
</script>

<template>
  <div class="p-4 border rounded shadow-sm">

    <div class="flex items-center">
      <h3 class="text-lg font-semibold mr-2">{{ note.title }}</h3>
      <span
        class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">{{
          note.category }}</span>
    </div>
    <p class="text-gray-700">{{ note.content }}</p>
    <div class="mt-4 flex space-x-2">
      <button @click="$emit('editNote', note)"
        class="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
      <button @click="$emit('removeNote', note)"
        class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
    </div>
  </div>
</template>

<style scoped></style>
