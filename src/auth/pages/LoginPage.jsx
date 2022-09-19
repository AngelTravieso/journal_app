import { useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { DisplaySettings, Google } from "@mui/icons-material";

import { AuthLayout } from '../layout/AuthLayout';

import { useForm } from '../../hooks';

import { checkingAuthentication, startGoogleSignIn, startSignInWithEmailAndPassword } from '../../store/auth';
import { useState } from 'react';

const formData = {
  email: '',
  password: '',
}

const formValidation = {
  email: [ (value) => value.includes('@'), 'El correo debe tener una @.' ],
  password: [ (value) => value.length >= 6, 'El password debe tener más de 6 letras.' ],
}


export const LoginPage = () => {

  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const { status, errorMessage } = useSelector( state => state.auth );

  const { 
    formState, email, password, onInputChange,
    isFormValid, emailValid, passwordValid,
  } = useForm( formData, formValidation );

  // Memorizar status
  const isAuthenticating = useMemo( () => status === 'checking', [status]);


  const onSubmit = ( event ) => {
    event.preventDefault();
    setFormSubmitted(true);
    if(!isFormValid) return;

    // console.log({ email, password });
    // dispatch( checkingAuthentication( email, password ) );

    dispatch( startSignInWithEmailAndPassword( formState) );

  }


  const onGoogleSignIn = () => {
    console.log('onGoogleSignIn');
    dispatch( startGoogleSignIn() );
  }

  return (
      <AuthLayout title="Login">
        <form onSubmit={ onSubmit }>
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2, pr: 1 }} >
              <TextField
                label="Correo"
                type="email"
                placeholder="correo@google.com"
                fullWidth
                autoComplete="off"
                name="email"
                value={ email }
                onChange={ onInputChange }
                error={ !!emailValid && formSubmitted }
                helperText={ emailValid }
                />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }} >
              <TextField
                label="Contraseña"
                type="password"
                placeholder="Contraseña"
                fullWidth
                autoComplete="off"
                name="password"
                value={ password }
                onChange={ onInputChange }
                error={ !!passwordValid && formSubmitted }
                helperText={ passwordValid }
                />
            </Grid>

            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }} >
              <Grid item xs={ 12 } sm={ 6 }>
                <Button
                  disabled={ isAuthenticating }
                  type="submit"
                  variant='contained'
                  fullWidth
                  >
                  Login 
                </Button>
              </Grid>

              <Grid item xs={ 12 } sm={ 6 }>
                <Button
                  disabled={ isAuthenticating }
                  variant='contained'
                  sx={{ mb: 2 }}
                  fullWidth
                  onClick={ onGoogleSignIn }
                >
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>

              <Grid
                item
                xs={ 12 }
                display={ !!errorMessage ? '' : 'none' }
              >
                <Alert severity='error'>{ errorMessage }</Alert>
              </Grid>
            
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid>

          </Grid>

          </form>
      </AuthLayout>
  )
}
