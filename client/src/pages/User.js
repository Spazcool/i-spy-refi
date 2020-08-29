import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom'
import { DB } from "../api/firestore.js";

import { AuthContext } from "../providers/AuthProvider";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Form from 'react-bootstrap/Form';

import '../App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    // height: 140,
    // width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function User(props) {
  
  const { isAuth, user } = useContext(AuthContext)
  const  [info, setInfo] = useState()
  const [spacing] = React.useState(2);
  const classes = useStyles();
  const emptyUser = { firstNameInput: '', lastNameInput: '', emailInput: '', passwordInput: '' }
  const [formData, setFormData] = useState(emptyUser)
  const [credsAreInvalid, setCredsAreInvalid] = useState('')
  const [firstNameColor, setFirstNameColor] = useState('')
  const [lastNameColor, setLastNameColor] = useState('')
  const [emailColor, setEmailColor] = useState('')
  const [passwordColor, setPasswordColor] = useState('')


  useEffect(() => {
    fetchUser()
  },[]);

  const fetchUser = async() => {
    const userDB = async () => await DB.getUser(user.user.uid)
    const { firstName, lastName, email } = await userDB();
    const data = {
      firstName,
      lastName,
      email
    }
    setInfo(data);
  }

  const handleInputChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value });
  }
  
  const handleFormSubmit = (event) => {
    // data needs to look something like this
    // const {email, displayName, firstName, lastName, zpid, admin} = updateUserData;

    // DB.updateUser(user.user.uid, updateUserData)
    //then return a okay, updated successfully toast
    // event.preventDefault()
    // let newUser = {
    //     firstName: formData.firstNameInput,
    //     lastName: formData.lastNameInput,
    //     email: formData.emailInput,
    //     password: formData.passwordInput
    // }
    // if (validateUserInput(newUser)) {
    //     createUser(newUser)
    //     setFormData(emptyUser)
    // } else {
    //     setCredsAreInvalid(errorMessage)
    // }
  }

  const list = (obj) => {
    let arr = [];
    for (const property in obj) {
      arr.push(
        <Form.Group controlId={`input${property}`} key={property}>
          <Form.Label className={`${property}Color`}>{property}</Form.Label>
          <Form.Control name={`${property}Input`} type="text" placeholder={obj[property]} value={formData[`${property}Input`]} onChange={handleInputChange} />
          
        </Form.Group>
      )
    }
    return arr;
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

  return (
    !isAuth ? 
      <Redirect to='/' />
      :
      <Container className="signup">
          <h1>User Page</h1>
        <Grid container justify="center" spacing={spacing}>
          <Grid item xs={12} md={6}>
            <Form onSubmit={handleFormSubmit}>
              {info ? 
                list(info)
              :
              <></>  
              }
              <Button className='m-1' variant="contained" type="submit">
                Update
              </Button>
            </Form>
          </Grid>
        </Grid>
      </Container>
  );
}

export default User;