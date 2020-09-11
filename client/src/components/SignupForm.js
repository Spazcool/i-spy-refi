import React, { useState } from 'react';
import { auth, signUpWithEmail } from "../firebase";

import LoginGoogle from '../components/LoginGoogle';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';

import {GoSignIn} from 'react-icons/go';

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
    marginTop: '1em'
  },
}));

const Signup = props => {
    const classes = useStyles();

    const emptyUser = { firstNameInput: '', lastNameInput: '', emailInput: '', passwordInput: '' }
    const errorMessage = 'invalid credentials'

    const [formData, setFormData] = useState(emptyUser)
    const [credsAreInvalid, setCredsAreInvalid] = useState('')
    const [firstNameColor, setFirstNameColor] = useState('')
    const [lastNameColor, setLastNameColor] = useState('')
    const [emailColor, setEmailColor] = useState('')
    const [passwordColor, setPasswordColor] = useState('')

    const handleInputChange = event => {
        event.preventDefault()
        const { name, value } = event.target
        setFormData({ ...formData, [name]: value });
    }

    const handleFormSubmit = event => {
        event.preventDefault()
        let newUser = {
            firstName: formData.firstNameInput,
            lastName: formData.lastNameInput,
            email: formData.emailInput,
            password: formData.passwordInput
        }
        if (validateUserInput(newUser)) {
            createUser(newUser)
            setFormData(emptyUser)
        } else {
            setCredsAreInvalid(errorMessage)
        }
    }

    const validateUserInput = ({ firstName, lastName, email, password }) => {
        let isValid = true;

        if (!firstName) {
            setFirstNameColor('text-danger')
            isValid = false;
        } else {
            setFirstNameColor('')
        }

        if (!lastName) {
            setLastNameColor('text-danger')
            isValid = false;
        } else {
            setLastNameColor('')
        }

        if (!email) {
            setEmailColor('text-danger')
            isValid = false;
        } else {
            setEmailColor('')
        }

        if (!password) {
            setPasswordColor('text-danger')
            isValid = false;
        } else {
            setPasswordColor('')
        }

        return isValid;
    }

    const createUser = async (userData) => {
      try{
        const {user} = await auth.createUserWithEmailAndPassword(userData.email, userData.password);
        signUpWithEmail(user, userData);
      }
      catch(error){
        // todo need a toast here: copy the one in the login page
        console.log(error)
      }

    };

    return (
      <Grid
      container
      justify='center'
      spacing={2}
      >
      <Grid item xs={12}>        
        <form onSubmit={handleFormSubmit}>
          <Typography>Sign up with your Email:</Typography>
          <FormControl>
            <InputLabel htmlFor="my-input" className={firstNameColor}>First Name</InputLabel>
            <Input className={classes.textField} id="my-input" aria-describedby="my-helper-text" name="firstNameInput" type="text" placeholder={Date.now()%2 ? 'Joe' : 'Jane'} value={formData.firstNameInput} onChange={handleInputChange}/>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="my-input" className={lastNameColor}>Last Name</InputLabel>
            <Input className={classes.textField} id="my-input" aria-describedby="my-helper-text" name="lastNameInput" type="text" placeholder="Smith" value={formData.lastNameInput} onChange={handleInputChange}/>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input className={classes.textField} id="my-input" aria-describedby="my-helper-text" name="emailInput" type="email" placeholder={`${Date.now()%2 ? 'Joe' : 'Jane'}@smith.com`} value={formData.emailInput} onChange={handleInputChange}/>
            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor="my-input">Password</InputLabel>
            <Input className={classes.textField} id="my-input" aria-describedby="my-helper-text" name="passwordInput" type="password" placeholder="Password123" value={formData.passwordInput} onChange={handleInputChange}/>
          </FormControl>

          <FormControl>
            <FormHelperText className="text-danger" id="my-helper-text"> {credsAreInvalid}</FormHelperText>
          </FormControl>

          <span className={classes.right} >
            <Button type="submit" variant="contained" >
              <span className="flip"><GoSignIn /></span>
              <span className={classes.control}>Sign-Up</span>
            </Button>
          </span>
        </form>
      </Grid>

        <Grid item xs={12}>        
          <form>
            <Typography>Sign in with your Google account:</Typography>
            <span className={classes.right}>
              <LoginGoogle/>
            </span>
          </form>
        </Grid>
      </Grid>
    )
}

export default Signup;

// {/* <Form onSubmit={handleFormSubmit}>

    

// <Form.Group controlId="inputLastName">
//     <Form.Label className={lastNameColor}>Last Name</Form.Label>
//     <Form.Control name="lastNameInput" type="text" placeholder="" value={formData.lastNameInput} onChange={handleInputChange} />
// </Form.Group>

// <Form.Group>
//     <Form.Text className="text-danger">
//         {credsAreInvalid}
//     </Form.Text>
// </Form.Group>

// <Button className='m-1' variant="contained" type="submit">
// <span className="flip"><GoSignIn/></span>
// <span className={classes.control}>Sign-Up</span>
// </Button>
// <LoginGoogle/>

// </Form> */}

// <Form.Group controlId="emailInput">
// <Form.Label className={emailColor}>Email address</Form.Label>
// <Form.Control name="emailInput" type="email" placeholder="Enter email" value={formData.emailInput} onChange={handleInputChange} />
// <Form.Text className="text-muted">
//     We'll never share your email with anyone else.
// </Form.Text>
// </Form.Group>

// <Form.Group controlId="inputPassword">
// <Form.Label className={passwordColor}>Password</Form.Label>
// <Form.Control name="passwordInput" type="password" placeholder="Password" value={formData.passwordInput} onChange={handleInputChange} />
// </Form.Group>
//     <Form.Group controlId="inputFirstName">
// {/* <Form.Label className={firstNameColor}>First Name</Form.Label>
// <Form.Control name="firstNameInput" type="text" placeholder="" value={formData.firstNameInput} onChange={handleInputChange} />
// </Form.Group> */}