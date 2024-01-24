import { defineStore } from 'pinia'
import axios from 'axios'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [],
  }),
  getters: {
    // getNoteByID
    getNoteById: (state) => (id) => {
      return state.notes.find((note) => note.id === id)
    }
  },
  actions: {
    // fetch all notes
    async fetchNotes() {
      try {
        const response = await axios.get('http://localhost:3000/notes')
        this.notes = response.data
      } catch (error) {
        console.error('ERROR Fetching Notes :', error)
      }
    },
    async updateNote(note) {
      try {
        await axios.put(`http://localhost:3000/notes/${note.id}`, note);
        await this.fetchNotes();
      } catch (error) {
        console.error('ERROR Updating Note:', error)
      }
    },
    async removeNote(note) {
      try {
        console.table(note);
        await axios.delete(`http://localhost:3000/notes/${note.id}`, note);
        await this.fetchNotes();
      } catch (error) {
        console.error('ERROR Deleting Note:', error)
      }
    },
    async addNote(note) {
      try {
        console.table(note);
        await axios.post(`http://localhost:3000/notes`, note);
        await this.fetchNotes();
      } catch (error) {
        console.error('ERROR Adding Note:', error)
      }
    }
  }
})
