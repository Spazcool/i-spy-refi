import React, { useState, useContext } from 'react';
import { auth } from "../firebase";
import { CustomThemeContext } from '../providers/ThemeProvider';
import LoginGoogle from '../components/LoginGoogle';

import Form from 'react-bootstrap/Form';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  themed: {
    backgroundColor: theme.primary,
  },
  control: {
    'padding-left': theme.spacing(1),
  },
}));

const LoginOptions = props => {
    const { theme } = useContext(CustomThemeContext);
    const classes = useStyles(theme);
    const emptyCreds = { emailInput: '', passwordInput: '' }
    const errorMessage = 'invalid credentials'
    const [formData, setFormData] = useState(emptyCreds)
    const [credsAreInvalid, setCredsAreInvalid] = useState('')

    const handleInputChange = event => {
        event.preventDefault()
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value });
    }

    const handleFormSubmit = event => {
        event.preventDefault()
        const inputCreds = {
            email: formData.emailInput,
            password: formData.passwordInput
        }
        login(inputCreds)
        setFormData(emptyCreds)
    }

    const login = (creds) => {
      auth.signInWithEmailAndPassword(creds.email, creds.password)
        .catch(error => {
          setCredsAreInvalid(errorMessage)
          console.error("Error signing in with password and email", error);
        });
    };
    return (
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="emailInput">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="emailInput" type="email" placeholder="Enter email" value={formData.emailInput} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group controlId="inputPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control name="passwordInput" type="password" placeholder="Password" value={formData.passwordInput} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group>
            <Form.Text className="text-danger">
                {credsAreInvalid}
            </Form.Text>
        </Form.Group>
        <Button className='m-1' type="submit" variant="contained" >
          <EmailIcon/>
          <span className={classes.control}>Sign-In</span>
        </Button>
        <LoginGoogle/>
      </Form>
    )
}

export default LoginOptions;