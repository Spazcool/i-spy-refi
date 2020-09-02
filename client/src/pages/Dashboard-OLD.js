<<<<<<< HEAD
<<<<<<< HEAD:client/src/pages/Houses.js.old
import React, { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
// import { firestore } from "../firebase";
import { DB } from '../api/firestore.js';
import { Button, Col, Container, Row } from 'react-bootstrap';
import '../App.css';

const Houses = (props) => {
  // Destructure the logout function from AuthContext
  const { logout, user } = useContext(AuthContext);
=======
import React, { useContext, useState } from "react";
=======
import React, { useContext, useState } from 'react';
>>>>>>> 74c257ab4684af7444f3d8de4851e3ce52ed85c8

import { AuthContext } from '../providers/AuthProvider';
import { DB } from '../api/firestore.js';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import '../App.css';

const Dashboard = (props) => {
  const { user } = useContext(AuthContext);
>>>>>>> 74e602f700dd268423a75613d22f4b1148d43c83:client/src/pages/Dashboard-OLD.js
  const [houses, setHouses] = useState([]);
  const [spacing] = React.useState(2);

  const getHouses = async () => {
    // ------------- DESIRED DB CALL -------------
    // TO TEST OUT THE EXAMPLES BELOW, COMMENT OUT THE NEXT 2 LINES & UNCOMMENT THE APPROPRIATE EXAMPLE + THE CONSOLE LOG
    let houses = await DB.getHouses();
<<<<<<< HEAD
<<<<<<< HEAD:client/src/pages/Houses.js.old
    setHouses(houses);
=======
    console.log(houses)
    setHouses(houses)
>>>>>>> 74e602f700dd268423a75613d22f4b1148d43c83:client/src/pages/Dashboard-OLD.js
=======
    console.log(houses);
    setHouses(houses);
>>>>>>> 74c257ab4684af7444f3d8de4851e3ce52ed85c8

    // ------------- EXAMPLES -------------
    // ------------- GET: USER, USERS, HOUSE -------------
    let users = await DB.getUsers();
    console.log(users);
    // let house = await DB.getHouseByOwner(user.user.uid)
    // let house = await DB.getHouseByID('MznGptrV4Zd5dzwtgo46'); // DB colleciton id NOT the zpid
    // let userDB = await DB.getUser(user.user.uid); //returns current logged in user, for a list of users ids you'll need to call DB.getUsers() first
    // console.log(house)
    // ------------- CREATE: HOUSE -------------
    // FYI: USER CREATION HAPPENS AT SIGNUP/LOGIN IF YOU WANT TO SEE IT IN ACTION
    // const houseData = {
    //   zpid: 456789,
    //   location: [50, 42]
    //   comps: []
    // }
    // let house = await DB.createHouse(user.user.uid, houseData)

    // ------------- UPDATE: USER, HOUSE -------------
    // FYI .update ON FIREBASE RETURNS NOTHING, THIS IS WORKING BUT TO SEE THE UPDATED VALUE, YOU'LL NEED TO CALL A .get OR CHECKOUT THE DB VIA THE FIREBASE CONSOLE: https://console.firebase.google.com/project/ispyrefi/firestore/
    // const userData = {
    //   email: 'giggolojo@joe.joe',
    //   displayName: 'barry',
    //   firstName: 'joe',
    //   lastName: 'giglowski',
    //   zpid: 3456789,
    //   admin: true,
    // }
    // let updatedUser = async () => await DB.updateUser(user.user.uid, userData)
    // updatedUser();

    // const houseData = {
    //   zpid: 456780,
    //   comps: [{something: 'else'}],
    // }
    // let updateHouse = async () => await DB.updateHouse(houseData)
    // updateHouse();

    // ------------- DELETE: USER, HOUSE -------------
    // FYI you can grab id from context if user is deleting self (ie. user.user.uid), otherwise you'll need to run DB.getUsers and filter the data to find the user you want to delete, same thing for deleting a house
    // let deleteUser = async () => await DB.deleteUser('SZJUYZKs1oPBZTAoxJy2zXb8gwA3')
    // deleteUser();

    // let deleteHouse = async () => await DB.deleteHouse('iN89T5GcCeCJcx1oPrdV') //
    // deleteHouse();
  };
  return (
<<<<<<< HEAD
<<<<<<< HEAD:client/src/pages/Houses.js.old
    <Container className='signup'>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1>HOUSES Page</h1>
          <Button
            className='m-1'
            onClick={() => {
              logout();
              setHouses([]);
            }}
          >
            Logout
          </Button>
          <Button
            className='m-1'
            onClick={() => {
              props.history.push('/');
            }}
          >
            Home
          </Button>
          <Button className='m-1' onClick={getHouses}>
            Show Houses
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <ul>
            {houses.map((house, i) => (
              <li key={`house-${i}`}>value: {house.value}</li>
            ))}
          </ul>
        </Col>
      </Row>
=======
    <Container className="signup">
      <Grid container justify="center" spacing={spacing}>
=======
    <Container className='signup'>
      <Grid container justify='center' spacing={spacing}>
>>>>>>> 74c257ab4684af7444f3d8de4851e3ce52ed85c8
        <Grid md={12} item>
          <h1>Dashboard Page</h1>
          <Button onClick={getHouses}>Show Houses</Button>
        </Grid>
        <Grid md={12} item>
          <Paper>
            <ul>
              {houses.map((house, i) => {
                return (
                  <li key={`house-${i}`}>
                    <ul>
                      <li>comps: {house.comps}</li>
                      <li>location: {house.location}</li>
                      <li>owner: {house.owner}</li>
                      <li>zpid: {house.zpid}</li>
                      <li>lastUpdated: {house.lastUpdated}</li>
                    </ul>
                  </li>
                );
              })}
            </ul>
          </Paper>
        </Grid>
      </Grid>
>>>>>>> 74e602f700dd268423a75613d22f4b1148d43c83:client/src/pages/Dashboard-OLD.js
    </Container>
  );
};

export default Dashboard;
