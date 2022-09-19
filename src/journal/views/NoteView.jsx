import { Button, Grid, TextField, Typography } from "@mui/material";
import { SaveOutlined } from '@mui/icons-material';
import { ImageGallery } from "../components";

const date = new Date().toLocaleDateString('es-VE');

export const NoteView = () => {
  return (
    <Grid
        className='animate__animated animate__fadeIn animate__faster'
        container
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{ mb: 1 }}
    >
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light'>{  date }</Typography>
        </Grid>

        <Grid item>
            <Button color='primary' sx={{ padding: 2 }}>
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} /> 
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField
                type='text'
                variant='filled'
                fullWidth
                placeholder="Ingrese un título"
                label='Título'
                sx={{ border: 'none', mb: 1 }}
            />
        </Grid>

        <Grid container>
            <TextField
                type='text'
                variant='filled'
                fullWidth
                multiline
                placeholder="¿Qué sucedió en el día de hoy?"
                minRows={ 5 }
            />
        </Grid>

        {/* Galería de Imágenes */}
        <ImageGallery />

    </Grid>
  )
}
