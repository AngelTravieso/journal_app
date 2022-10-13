import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
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
            state.messageSaved = '';
        },
        setNotes: (state, { payload }) => {
            state.notes = payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
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

            state.messageSaved = `${ payload.title }, actualizada correctamente`;

        },
        setPhotosToActiveNote: ( state, { payload }) => {
            state.active.imageUrls = [ ...state.active.imageUrls, ...payload ];
            state.isSaving = false;
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
    setPhotosToActiveNote,
    deleteNoteById
} = journalSlice.actions;