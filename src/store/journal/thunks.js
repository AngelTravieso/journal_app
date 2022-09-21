import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { savingNewNote, addNewEmptyNote, setActiveNote } from "./";

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

