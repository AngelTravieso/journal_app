import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { loadNotes } from "../../helpers/loadNotes";
import { savingNewNote, addNewEmptyNote, setActiveNote, setNotes } from "./";

export const startNewNote = () => {

    return async( dispatch, getState ) => {

        // TODO: tarea dispatch
        dispatch( savingNewNote() );

        console.log('startNewNote');

        // uid del usuario
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        // Crear la referencia del documento (donde lo quiero insertar)
        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes`) );

        // Guardar documento
        await setDoc( newDoc, newNote );

        newNote.id = newDoc.id;

        //! dispatch
        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );

    }
}


export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;

        // Nunca deberia suceder (por si acaso)
        if(!uid) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes( uid );

        dispatch( setNotes( notes ) );

    }
}