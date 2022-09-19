import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '../firebase/config';
import { login } from '../store/auth';

export const useCheckAuth = () => {
  
    const { status } = useSelector( state => state.auth );
    const dispatch = useDispatch();
  
    useEffect(() => {
  
      // Cuando el estado de la autenticacion cambia
      onAuthStateChanged( FirebaseAuth, async( user ) => {
        
        if( !user ) return dispatch( logout() );
  
        const { uid, displayName, email, photoURL } = user;
  
        dispatch( login( { uid, displayName, email, photoURL }) );
  
      });
  
    }, []);

    return {
        status
    }

}
