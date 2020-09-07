import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom'
import { DB } from "../api/firestore.js";
import { AuthContext } from "../providers/AuthProvider";

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Form from 'react-bootstrap/Form';

import '../App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  border: {
    border: '2px red dotted',
  },
  paper: {
    // height: 140,
    // width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function User(props) {
  const classes = useStyles();
  const emptyUser = { firstNameInput: '', lastNameInput: '', emailInput: '', passwordInput: '' }
  const { isAuth, user } = useContext(AuthContext);
  
  const [spacing] = useState(2);
  const [userfromdb, setUser] = useState('');
  const [users, setUsers] = useState([]);
  const [house, setHouse] = useState('');
  const [houses, setHouses] = useState([]);
  const [fakeHouse, setFakeHouse] = useState('');
  const [fakeUser, setFakeUser] = useState('');
  const [formData, setFormData] = useState(emptyUser)
  const [credsAreInvalid, setCredsAreInvalid] = useState('')
  const [firstNameColor, setFirstNameColor] = useState('')
  const [lastNameColor, setLastNameColor] = useState('')
  const [emailColor, setEmailColor] = useState('')
  const [passwordColor, setPasswordColor] = useState('')
  const [toBeDeleted, setToBeDeleted] = useState('');
  const [toBeDeletedUser, setUserToBeDeleted] = useState('');
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [houseData, setHouseData] = useState('');
  const [userData, setUserData] = useState('');

  useEffect(() => {
    if(isAuth){
      fetchUser();
      //example code below
      fetchUsers();
      fetchHouse();
      fetchHouses();
    }
  }, [isAuth]);

  // -------------------- GET THE THINGS --------------------
  const fetchUser = async() => {
    const userDB = async () => await DB.getUser(user.user.uid);
    const totalUser = await userDB();

    const { firstName, lastName, email, uid } = totalUser;
    const data = {
      firstName,
      lastName,
      email,
      uid,
    };
    setUser(data);
  }
  const fetchUsers = async() => {
    const users = async () => await DB.getUsers();
    const totalUsers = await users();

    setUsers(totalUsers);
  }
  const fetchHouse = async(hid) => {
    let house;
    if(hid){
      house = async () => await DB.getHouseByID(hid);
      const userHouse = await house();
      setFakeHouse(userHouse);
    } else {
      house = async () => await DB.getHouseByOwner(user.user.uid);
      const [userHouse] = await house();
      userHouse === undefined ? setHouse('') : setHouse(userHouse);
    }
  }
  const fetchHouses = async() => {
    const houses = async () => await DB.getHouses();
    const allHouses = await houses();

    setHouses(allHouses);
  };

  // -------------------- CREATE THE THINGS --------------------
  const createFakeHouse = async() => {
    const data = {
      hid: 12345678906123445673, //todo will require a uuid library here
      zpid: 56358231311,
      latitude: 89,
      longitude: 23,
      zip: '02451',
      state: 'MA',
      city: 'Waltham',
      street: '128 Seminole Avenue',
      comps: [
        { date: '10-30-20', value: 87654 },
        { date: '90-30-20', value: 87354 },
      ],
      formData: {
        bathoom: 567,
        kitchen: 456,
        bedroom: 5678,
      },
      lastUpdated: '10-30-20',
    };

    const house = async () => await DB.createHouse(user.user.uid, data);
    const returnedHouse = await house();
    setFakeHouse(returnedHouse)
  }
  const createFakeUser = async() => {
    const data = {
      uid: 'RWBgwgo3mCSac6d9yM15HuTUjLR2',
      email: 'spazcool@hotmail.com',
      zpid: 45678,
      displayName: 'duggles',
      firstName: 'dug',
      lastName: 'gles',
      admin: false,
      lastUpdated: '10-30-20',
    };

    const fakedUser = async () => await DB.createUser(data, data);
    const returnedUser = await fakedUser();
    console.log(returnedUser);

    setFakeUser(returnedUser);
  };

  // -------------------- DELETE THE THINGS --------------------
  const deleteFakeHouse = async() => {
    const house = async () => await DB.deleteHouse(toBeDeleted);
    const deletedHouse = await house();
    console.log(deletedHouse);
    setFakeHouse(''); //todo theres a bug in the api file here, mentioned on trello
  //to make house list go away, will need to recall fetchHouses
  }
  const deleteFakeUser = async() => {
    console.log(toBeDeletedUser)
    const userthing = async () => await DB.deleteUser(toBeDeletedUser);
    const deletedUser = await userthing();
    console.log(deletedUser)
    setFakeUser(''); //todo theres a bug in the api file here, mentioned on trello
  //to make house list go away, will need to recall fetchHouses
  }
  const handleDeleteSelection = (event) => {
    setToBeDeleted(event.target.value);
  }
  const handleDeleteUserSelection =  (event) => {
    setUserToBeDeleted(event.target.value);
  }

  // -------------------- UPDATE THE THINGS --------------------
  const updateFakeHouse = async() => {
    //hard coded to updating the state attribute for the house selected in the delete dropdown
    const data = {
      hid: toBeDeleted, 
      zpid: 56358239, 
      state: houseData, 
      // latitude: null, 
      // longitude, 
      // zip, 
      // city, 
      // street, 
      // comps, 
      // formData, 
      // lastUpdated
    }

    const house = async () => await DB.updateHouse(data);
    const updatedHouse = await house();
    setFakeHouse(updatedHouse); 
  }
  const updateFakeUser = async() => {
     //hard coded to updating the state attribute for the firstName selected in the delete dropdown
     const data = {
      firstName: userData,
      // uid: ,
      // displayName,
      // email,
      // lastName,
      // zpid,
      // admin,
      // lastUpdated,
      // hid: toBeDeleted, 
      // zpid: 56358239, 
      // state: houseData, 
    }
    const userthing = async () => await DB.updateUser(toBeDeletedUser, data);
    const updatedUser = await userthing();
    setFakeUser(updatedUser); 
  }
  // -------------------- UPDATE USER VALUES (THE REAL ONE) --------------------
  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }
  const handleFormSubmit = (event) => {
    // data needs to look something like this
    // const {email, displayName, firstName, lastName, zpid, admin} = updateUserData;
    // DB.updateUser(user, updateUserData)
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
      );
    }
    return arr;
  }
  const validateUserInput = ({ firstName, lastName, email, password }) => {
    let isValid = true;

    if (!firstName) {
      setFirstNameColor('text-danger');
      isValid = false;
    } else {
      setFirstNameColor('');
    }

    if (!lastName) {
      setLastNameColor('text-danger');
      isValid = false;
    } else {
      setLastNameColor('');
    }

    if (!email) {
      setEmailColor('text-danger');
      isValid = false;
    } else {
      setEmailColor('');
    }

    if (!password) {
      setPasswordColor('text-danger');
      isValid = false;
    } else {
      setPasswordColor('');
    }

    return isValid;
  }
  const handleHouseChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setHouseData(value);
  }
  const handleUserChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setUserData(value);
  }

  // -------------------- SHOW ALL THE THINGS --------------------
  const listHouses = () => {
    return (houses.map((house,i) => <MenuItem key={'house'+i} value={house.hid}>{house.hid}</MenuItem>));
  }
  
  // -------------------- DROPDOWNS --------------------
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleOpen2 = () => {
    setOpen2(true);
  };

  return (
    !isAuth ? 
      <Redirect to='/' />
      :
      <Container className="">
          <h1>User Page</h1>
        <Grid container justify="center" spacing={spacing}>
          <Grid item xs={12} md={6}>
            <Form onSubmit={handleFormSubmit}>
              {userfromdb ? 
                list(userfromdb)
              :
              <></>  
              }
              <Button className='m-1' variant="contained" type="submit">
                Update
              </Button>
            </Form>
          </Grid>

          <Grid item xs={12}><h1>Testing Bullshit</h1></Grid>
          {/* SHOW VALUES FROM INITIAL FETCHES */}
          <Grid item xs={3} className={classes.border}>
            <h3>user</h3>
            <span>{userfromdb.email}</span>
          </Grid>
          <Grid item xs={3} className={classes.border}>
            <h3>users</h3>
            <ul>
              {users.map((user, i) => (
                <li key={'user' + i}>{user.email}</li>
              ))}
            </ul>
          </Grid>
          <Grid item xs={3} className={classes.border}>
            <h3>house HID</h3>
            <span>{house.hid === undefined ? '' : house.hid}</span>
          </Grid>
          <Grid item xs={3} className={classes.border}>
            <h3>houses HID</h3>
            <ul>{houses.map((house,i) => <li key={'house'+i}>{house.hid}</li>)}</ul>
          </Grid>

          {/* CREATE USER/HOUSE FROM HARDCODED DATA */}
          <Grid item xs={6} className={classes.border}>
              <Button className='m-1' variant="contained" type="button" onClick={createFakeHouse}>
                Create Fake House
              </Button>
            <div>{fakeHouse.message ? fakeHouse.message : ''}</div>
          </Grid>
          <Grid item xs={6} className={classes.border}>
              <Button className='m-1' variant="contained" type="button" onClick={createFakeUser}>
                Create Fake User
              </Button>
              <div>{fakeUser.message ? fakeUser.message : ''}</div>
          </Grid>
          
          {/* DELETE USER/HOUSE FROM FETCHED DATA */}
          <Grid item xs={6} className={classes.border}>
            <h3>Delete a House</h3>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Houses</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={toBeDeleted}
                onChange={handleDeleteSelection}
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
              >
                {listHouses()}               
              </Select>
            </FormControl>
            <Button className='m-1' variant="contained" type="button" onClick={deleteFakeHouse}>
              Delete Fake House
            </Button>
            <div>{fakeHouse.message ? fakeHouse.message : ''}</div>
          </Grid>
          <Grid item xs={6} className={classes.border}>
          <h3>Delete a User</h3>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Users</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={toBeDeletedUser}
                onChange={handleDeleteUserSelection}
                open={open2}
                onClose={handleClose2}
                onOpen={handleOpen2}
              >
                {users.map((user) => <MenuItem key={user.uid} value={user.uid}>{user.uid}</MenuItem>)}               
              </Select>
            </FormControl>
              <Button className='m-1' variant="contained" type="button" onClick={deleteFakeUser}>
                Delete Fake User
              </Button>
              <div>{fakeUser.message ? fakeUser.message : ''}</div>
          </Grid>

          {/* UPDATE USER/HOUSE FROM HARDCODED DATA */}
          <Grid item xs={6} className={classes.border}>
            <Form.Group controlId={`inputFakeHouse`}>
              <Form.Label className={`fakeHouseColor`}>Fake House</Form.Label>
              <Form.Control name={`fakeHouseInput`} type="text" placeholder='fake house' value={houseData} onChange={handleHouseChange} />    
            </Form.Group>
            <Button className='m-1' variant="contained" type="button" onClick={updateFakeHouse}>
              Update Fake House
            </Button>
            <div>{fakeHouse.message ? fakeHouse.message : ''}</div>
          </Grid>
          <Grid item xs={6} className={classes.border}>
            <Form.Group controlId={`inputFakeUser`}>
              <Form.Label className={`fakeUserColor`}>Fake User</Form.Label>
              <Form.Control name={`fakeUserInput`} type="text" placeholder='fake user' value={userData} onChange={handleUserChange} />    
            </Form.Group>
            <Button className='m-1' variant="contained" type="button" onClick={updateFakeUser}>
              Update Fake User
            </Button>
            <div>{fakeUser.message ? fakeUser.message : ''}</div>
          </Grid>
          <Grid item xs={6} className={classes.border}>
              <Button className='m-1' variant="contained" type="button" onClick={()=> fetchHouse('1234567890')}>
                Get Fake House by HID
              </Button>
              <div>{fakeHouse.hid ? fakeHouse.hid : ''}</div>
          </Grid>
        </Grid>
      </Container>
  );
}

export default User;
