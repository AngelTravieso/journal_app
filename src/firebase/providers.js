import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

// Proveedores de autenticacion
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {

    try {

        const result = await signInWithPopup( FirebaseAuth, googleProvider );
        // const credential = GoogleAuthProvider.credentialFromResult( result );
        // console.log({credential});

        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            // User Info
            displayName,
            email,
            photoURL,
            uid,
        }
        
    } catch(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
    
        return {
            ok: false,
            errorMessage,
        }
    }

}


export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {

    try {

        console.log({ email, password, displayName });

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;

        // TODO: actualizar el displayName en firebase
        await updateProfile( FirebaseAuth.currentUser, {
            displayName
        });

        return {
            ok: true,
            uid,
            photoURL,
            email,
            displayName,
        }


    } catch(error) {
        //* Aqui se leen los codigos de validacion de firebase para mostrar mensajes de error más personalizados
        console.log(error);
        return { 
            ok: false,
            errorMessage: error.message
        }
    }

}


export const loginWithEmailPassword = async ({ email, password }) => {

    try {

        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, displayName, photoURL } = resp.user;

        return {
            ok: true,
            uid,
            photoURL,
            //email,
            displayName,
        }

    } catch(error) {
        console.log(error);
        return {
            ok: false,
            errorMessage: error.message,
        }
    }

}


export const logoutFirebase = async () => {
    // Cerrar sesion por FB
    return await FirebaseAuth.signOut();
}