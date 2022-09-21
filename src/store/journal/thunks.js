import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";

export const startNewNote = () => {

    return async( dispatch, getState ) => {

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
        const setDocResp = await setDoc( newDoc, newNote );

        //! dispatch
        // dispatch( newNote )
        // dispatch(a activarNote )

    }
}

