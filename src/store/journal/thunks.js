import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";
import { 
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setSaving,
    updateNote,
    setPhotosToActiveNote,
    setNotes
} from "./";

export const startNewNote = () => {

    return async( dispatch, getState ) => {

        // TODO: tarea dispatch
        dispatch( savingNewNote() );

        console.log('startNewNote');

        // getState para buscar dato en particular de nuestro store

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


export const startSaveNote = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );

        // Obtener id de usuario y nota activa
        const { uid } = getState().auth;
        const { active:note } = getState().journal; 

        // remover id de la nota (para que no lo duplique en FB)
        const noteToFireStore = { ...note }
        delete noteToFireStore.id;

        // Crear la referencia al documento en FireBase
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );

        // Guardar nota actualizada
        // sin merge: sobreescribe un documento o lo crea si no existe
        // con merge: actualiza los campos del documento o lo crea si no existe

        await setDoc(docRef, noteToFireStore, { merge: true });

        dispatch( updateNote( note ) );

    }
}


export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch ) => {

        dispatch( setSaving() );

        // Subir 1 solo archivo
        // await fileUpload( files[0] );

        // Subir en secuencia (multiples img)
        const fileUploadPromises = []; // esto devuelve una promesa

        for (const file of files) {
            // Crear arreglo de promesas
            fileUploadPromises.push( fileUpload( file ) )
        }

        // Cuando resuelve
        const photosUrls = await Promise.all( fileUploadPromises );

        dispatch( setPhotosToActiveNote( photosUrls ) );

    }
}