import React, { useState } from 'react';
import { auth, signUpWithEmail } from '../firebase';

import LoginGoogle from '../components/LoginGoogle';
import Toast from '../components/Toast';

import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';

import { GoSignIn } from 'react-icons/go';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  control: {
    'padding-left': theme.spacing(1),
  },
  right: {
    float: 'right',
    marginTop: '1em',
  },
  textDanger: {
    color: 'red',
  },
}));

const Signup = (props) => {
  const classes = useStyles();

  const emptyUser = {
    firstNameInput: '',
    lastNameInput: '',
    emailInput: '',
    passwordInput: '',
  };
  const errorMessage = 'invalid credentials';

  const [formData, setFormData] = useState(emptyUser);
  const [firstNameColor, setFirstNameColor] = useState('');
  const [lastNameColor, setLastNameColor] = useState('');
  const [emailColor, setEmailColor] = useState('');
  const [passwordColor, setPasswordColor] = useState('');
  const [openIt, setOpenIt] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    let newUser = {
      firstName: formData.firstNameInput,
      lastName: formData.lastNameInput,
      email: formData.emailInput,
      password: formData.passwordInput,
    };
    if (validateUserInput(newUser)) {
      createUser(newUser);
      setFormData(emptyUser);
    } else {
      setToastMessage(errorMessage);
      setOpenIt(true);
      setOpenIt(false);
    }
  };

  const validateUserInput = ({ firstName, lastName, email, password }) => {
    let isValid = true;

    if (!firstName) {
      setFirstNameColor(classes.textDanger);
      isValid = false;
    } else {
      setFirstNameColor('');
    }

    if (!lastName) {
      setLastNameColor(classes.textDanger);
      isValid = false;
    } else {
      setLastNameColor('');
    }

    if (!email) {
      setEmailColor(classes.textDanger);
      isValid = false;
    } else {
      setEmailColor('');
    }

    if (!password || password.length < 8) {
      setPasswordColor(classes.textDanger);
      isValid = false;
    } else {
      setPasswordColor('');
    }

    return isValid;
  };

  const createUser = async (userData) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        userData.email,
        userData.password
      );
      signUpWithEmail(user, userData);
    } catch (error) {
      setToastMessage(error.message);
      setOpenIt(true);
      setOpenIt(false);
    }
  };

  return (
    <Grid container justify='center' spacing={2}>
      <Grid item xs={12}>
        <form onSubmit={handleFormSubmit} align='center'>
          <Grid item xs={12} style={{'padding': '1em 0 0 0'}}>
            <Typography>Sign up with your Email</Typography>
            <FormControl className='padding'>
              <InputLabel htmlFor='my-input-fname' className={firstNameColor}>
                First Name
              </InputLabel>
              <Input
                className={classes.textField}
                id='my-input-fname'
                aria-describedby='my-helper-text'
                name='firstNameInput'
                type='text'
                placeholder={Date.now() % 2 ? 'Joe' : 'Jane'}
                value={formData.firstNameInput}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} style={{'padding': '1em 0 0 0'}}>
            <FormControl>
              <InputLabel htmlFor='my-input-lname' className={lastNameColor}>
                Last Name
              </InputLabel>
              <Input
                className={classes.textField}
                id='my-input-lname'
                aria-describedby='my-helper-text'
                name='lastNameInput'
                type='text'
                placeholder='Smith'
                value={formData.lastNameInput}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} style={{'padding': '1em 0 0 0'}}>
            <FormControl className='padding'>
              <InputLabel htmlFor='my-input-email'>Email address</InputLabel>
              <Input
                className={classes.textField}
                id='my-input-email'
                aria-describedby='my-helper-text'
                name='emailInput'
                type='email'
                placeholder={`${Date.now() % 2 ? 'Joe' : 'Jane'}@smith.com`}
                value={formData.emailInput}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} style={{'padding': '1em 0 0 0'}}>
            <FormControl>
              <InputLabel htmlFor='my-input-password' className={passwordColor}>
                Password
              </InputLabel>
              <Input
                className={classes.textField}
                id='my-input-password'
                aria-describedby='my-helper-text'
                name='passwordInput'
                type='password'
                placeholder='Password123'
                value={formData.passwordInput}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} style={{'padding': '1em 0 0 0'}}>
            <p align='center'>
              <Button type='submit' variant='contained' color='primary'>
                <span className='flip'>
                  <GoSignIn />
                </span>
                <span className={classes.control}>Sign-Up</span>
              </Button>
            </p>
          </Grid>
        </form>
      </Grid>
      <Grid item xs={12}><Divider/></Grid>
      <Grid item xs={12} style={{'padding': '1em 0 0 0'}}>
        <form align='center'>
          <Typography>Sign in with your Google account:</Typography>
          <span align='center'>
            <LoginGoogle />
          </span>
        </form>
      </Grid>
      <Toast openIt={openIt} message={toastMessage} />
    </Grid>
  );
};

export default Signup;
