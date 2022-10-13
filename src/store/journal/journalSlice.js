import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        savedMessage: '',
        notes: [],
        active: null,
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 1234567,
        //     imageUrls: [], // https://foto1.jpg, https://foto2.jpg, https://foto3.jpg
        // }
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            // Con redux se puede mutar el estado
            // [..., notes: action.payload]
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
        },
        setNotes: (state, { payload }) => {
            state.notes = payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            // TODO mensaje de error
        },
        updateNote: (state, { payload }) => {
            console.log(payload);
            state.isSaving = false;
            state.notes = state.notes.map(note => {
                
                if( note.id === payload.id ) {
                    return payload;
                }

                return note;
            });

            //TODO mostrar mensaje de actualizacion

        },
        deleteNoteById: (state, action) => {

        },
    }
});


// Action creators are generated for each case reducer function
export const {
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById
} = journalSlice.actions;