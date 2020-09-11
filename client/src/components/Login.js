import React, { useState } from 'react';
import { auth } from '../firebase';
import LoginGoogle from '../components/LoginGoogle';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';

import EmailIcon from '@material-ui/icons/Email';

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
}));

const LoginOptions = (props) => {
  const classes = useStyles();
  const emptyCreds = { emailInput: '', passwordInput: '' };
  const errorMessage = 'invalid credentials';
  const [formData, setFormData] = useState(emptyCreds);
  const [credsAreInvalid, setCredsAreInvalid] = useState('');

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const inputCreds = {
      email: formData.emailInput,
      password: formData.passwordInput,
    };
    login(inputCreds);
    setFormData(emptyCreds);
  };

  const login = (creds) => {
    auth
      .signInWithEmailAndPassword(creds.email, creds.password)
      .catch((error) => {
        setCredsAreInvalid(errorMessage);
        console.error('Error signing in with password and email', error);
      });
  };

  return (
    <Grid container justify='center' spacing={2} className="card-radius-gray">
      {/* <div class='login-margin center'> */}
      <Grid item xs={12}>
        <form onSubmit={handleFormSubmit}>
          <h4>Email:</h4>
          <FormControl>
            <InputLabel htmlFor='my-input'>Email address</InputLabel>
            <Input
              className={classes.textField}
              id='my-input'
              aria-describedby='my-helper-text'
              name='emailInput'
              type='email'
              placeholder='Enter email'
              value={formData.emailInput}
              onChange={handleInputChange}
            />
            <FormHelperText id='my-helper-text'>
              We'll never share your email.
            </FormHelperText>
          </FormControl>
          
          <FormControl>
            <InputLabel htmlFor='my-input'>Password</InputLabel>
            <Input
              className={classes.textField}
              id='my-input'
              aria-describedby='my-helper-text'
              name='passwordInput'
              type='password'
              placeholder='Password'
              value={formData.emailInput}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl>
            <FormHelperText className='text-danger' id='my-helper-text'>
              {' '}
              {credsAreInvalid}
            </FormHelperText>
          </FormControl>

          <span className={classes.right}>
            <Button type='submit' variant='contained'>
              <span className='flip'>
                <EmailIcon
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                />
              </span>
              <span className={classes.control}>Sign-In</span>
            </Button>
          </span>
        </form>
      </Grid>

      <Grid item xs={12}>
        <form>
          <h4>Google account:</h4>
          <span className={classes.right}>
            <LoginGoogle />
          </span>
        </form>
      </Grid>
      {/* </div> */}
    </Grid>
  );
};

export default LoginOptions;
