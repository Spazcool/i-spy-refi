import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom'
import { DB } from "../api/firestore.js";
import { AuthContext } from "../providers/AuthProvider";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';

import HomeIcon from '@material-ui/icons/Home';
import UpdateIcon from '@material-ui/icons/Update';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import WarningIcon from '@material-ui/icons/Warning';
import UserIcon from '@material-ui/icons/Person';

import Toast from '../components/Toast';

import { makeStyles } from '@material-ui/core/styles';
import '../App.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  form:{
    width: '100%',
    border: '2px dotted red'
  },
  right: {
    float: 'right',
    marginTop: '1em'
  },
}));

function User(props) {
  const classes = useStyles();
  const emptyUser = { firstName: '', lastName: '' };
  const { isAuth, user, logout } = useContext(AuthContext);
  
  const [spacing] = useState(2);
  const [userfromdb, setUser] = useState('');
  const [house, setHouse] = useState('');
  const [formData, setFormData] = useState(emptyUser);
  const [credsAreInvalid, setCredsAreInvalid] = useState('');
  const [firstNameColor, setFirstNameColor] = useState('');
  const [lastNameColor, setLastNameColor] = useState('');
  const [openIt, setOpenIt] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState('');

  useEffect(() => {
    if(isAuth){
      fetchUser();
      fetchHouse();
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

  const fetchHouse = async() => {
    const houseThing = async () => await DB.getHouseByOwner(user.user.uid);
    const [userHouse] = await houseThing();
    userHouse === undefined ? setHouse('') : setHouse(userHouse);
  }

  const deleteHouse = async() => {
    const houseThing = async () => await DB.deleteHouse(house.hid);
    const { message } = await houseThing();
    setHouse('');
    setToastMessage(message);
    setOpenIt(true);
    setOpenIt(false);
  }

  const deleteUser = async() => {
    const userthing = async () => await DB.deleteUser(user.user.uid);
    const {message} = await userthing();
    logout();
  }

  const updateUser = async(event) => {
    event.preventDefault();
    const data = {
      firstName: formData.firstName,
      lastName: formData.lastName,
    };
    const userthing = async () => await DB.updateUser(user.user.uid, data);
    const {message} = await userthing();
    if(message.includes('successfully')){
      setUser(data);
    }else{
      setUser(emptyUser)
    }  
    setToastMessage(message);
    setOpenIt(true);
    setOpenIt(false);
  }

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const listUserAttributes = (obj) => {
    let arr = [];
    for (const property in obj) {
      if(property !== 'uid' && property !== 'email'){
        arr.push(
          <Grid item xs={12} md={12} key={property}>
            <FormControl style={{width: '100%'}}>
              <InputLabel htmlFor={`my-input-${property}`} className={`${property}Color`}>{property}</InputLabel>
              <Input  className={classes.textField} id={`my-input-${property}`} aria-describedby="my-helper-text" name={property} type="text" placeholder={obj[property]} value={formData[property]} onChange={handleInputChange}/>
            </FormControl>
          </Grid>
        );
      }
    }
    return arr;
  }

  const validateUserInput = ({ firstName, lastName }) => {
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

    return isValid;
  }

  return (
    !isAuth ? 
      <Redirect to='/' />
      :
      <Grid container justify="center" spacing={spacing} style={{margin: '2em 0 2em 0'}}>
        <Grid item xs={12} style={{textAlign: 'center'}}>
          <h3>{userfromdb !== '' ? `${userfromdb.firstName} ${userfromdb.lastName}` : 'User Page'}</h3>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{padding: '1em 1em 5em 1em'}}>
            <form onSubmit={updateUser}>
              {userfromdb ? 
                listUserAttributes(userfromdb)
              :
              <></>  
              }
              <span className={classes.right} >
                <Button className='m-1' variant="contained" type="submit" >
                  <span className='flip shrink'><UpdateIcon/></span>Update
                </Button>
              </span>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} style={{textAlign: 'center'}}><h3>{house.hid === undefined ? '' : 'House Details'}</h3></Grid>
        <Grid item xs={12} md={6} > 
          {house.hid === undefined ? '' :
            <Paper style={{padding: '1em'}}>
              <ul>
                <li>House ID: {house.hid}</li>
                <li>House street: {house.street}</li>
                <li>House city: {house.city}</li>
                <li>House state: {house.state}</li>
                <li>House zip: {house.zip}</li>
                {/* <li>House location: {house.location}</li> */}
                {/* <li>House comps: {house.comps}</li> */}
                {/* <li>House renovations: {house.formData}</li> */}
              </ul>
            </Paper>
          }
        </Grid>

        <Grid item xs={12} style={{textAlign: 'center'}}><h2>Danger Zone</h2></Grid>
        <Grid item xs={12} md={6}>
          <Accordion style={{width: '100%', backgroundColor: '#d32f2f'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <span className='flip shrink'><WarningIcon/></span>
              <Typography color='textSecondary' gutterBottom style={{marginLeft: '1em'}}>
                Delete User / House
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CardActions className={classes.root}>
                {house.hid === undefined ? <></> : 
                  <Grid item xs={6}>
                    <Button className='m-1 danger' variant="contained" type="button" onClick={deleteHouse}>
                      <span className='flip shrink'><HomeIcon /></span>Delete House
                    </Button>
                  </Grid>
                }
                <Grid item xs={6}>
                  <Button className='m-1' variant="contained" type="button" onClick={deleteUser}>
                    <span className='flip shrink'><UserIcon /></span> Delete User
                  </Button>
                </Grid>
              </CardActions>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Toast
          openIt={openIt}
          message={toastMessage}
        />
      </Grid>
  );
}

export default User;
