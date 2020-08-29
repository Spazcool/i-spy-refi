import React, { useState } from 'react';
import { auth, signUpWithEmail } from "../firebase";

import LoginGoogle from '../components/LoginGoogle';

import Form from 'react-bootstrap/Form';
import Button from '@material-ui/core/Button';

const Signup = props => {

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
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="inputFirstName">
            <Form.Label className={firstNameColor}>First Name</Form.Label>
            <Form.Control name="firstNameInput" type="text" placeholder="" value={formData.firstNameInput} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group controlId="inputLastName">
            <Form.Label className={lastNameColor}>Last Name</Form.Label>
            <Form.Control name="lastNameInput" type="text" placeholder="" value={formData.lastNameInput} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group controlId="emailInput">
            <Form.Label className={emailColor}>Email address</Form.Label>
            <Form.Control name="emailInput" type="email" placeholder="Enter email" value={formData.emailInput} onChange={handleInputChange} />
            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>
        <Form.Group controlId="inputPassword">
            <Form.Label className={passwordColor}>Password</Form.Label>
            <Form.Control name="passwordInput" type="password" placeholder="Password" value={formData.passwordInput} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group>
            <Form.Text className="text-danger">
                {credsAreInvalid}
            </Form.Text>
        </Form.Group>
        <Button className='m-1' variant="contained" type="submit">
            Submit
        </Button>
        <LoginGoogle/>
      </Form>
    )
}

export default Signup;