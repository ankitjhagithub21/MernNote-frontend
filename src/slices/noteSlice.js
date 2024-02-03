// noteSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notes: [], // Initial array to store notes
};

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    
  },
});

export const { addNote,setNotes } = noteSlice.actions;

export default noteSlice.reducer;
