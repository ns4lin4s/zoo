import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Alert } from '@material-ui/lab';
import axios from 'axios';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        nsalinas.cl
      </Link>
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Drop = (props) => {
  const classes = useStyles();

  const [item, setItem] = useState('');
  const [error, setError] = useState(false);

  const handleInput = (event) => {
    setItem({
      ...item,
      [event.target.name]: event.target.value.trim(),
    });
  };

  const deleteItem = (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      data: item,
    };

    return axios.post('/api/item/delete', options)
      .then((response) => {
        setError(false);
        if (response.data.data.deletedCount === 0) {
          setError(true);
        } else {
          props.history.push('/');
        }
      }).catch((e) => {
        setError(true);
      });

  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <DeleteIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Eliminar Item
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='fname'
                name='firstName'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='lname'
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                onInput={handleInput}
                variant='outlined'
                required
                fullWidth
                id='name'
                label='Item'
                name='name'
              />
            </Grid>
            {/* <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value='allowExtraEmails' color='primary' />}
                label='I want to receive inspiration, marketing promotions and updates via email.'
              />
            </Grid> */}
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='secondary'
            onClick={deleteItem}
            className={classes.submit}
          >
            Eliminar
          </Button>
          <Grid container justify='center'>
            {error ? (
              <Grid item>
                <Alert severity='error'>No hemos encontrado el item, favor ingresa el nombre correcto.</Alert>
              </Grid>
            ) :
              <div />
            }
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Drop;
