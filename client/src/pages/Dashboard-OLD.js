import React, { useContext, useState } from "react";

import { AuthContext } from "../providers/AuthProvider";
import { DB } from "../api/firestore.js";

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import "../App.css";

const Dashboard = props => {
  const { user } = useContext(AuthContext);
  const [houses, setHouses] = useState([]);
  const [spacing] = React.useState(2);


  const getHouses = async () => {
    // ------------- DESIRED DB CALL -------------
    // TO TEST OUT THE EXAMPLES BELOW, COMMENT OUT THE NEXT 2 LINES & UNCOMMENT THE APPROPRIATE EXAMPLE + THE CONSOLE LOG
    let houses = await DB.getHouses();
    console.log(houses)
    setHouses(houses)

    // ------------- EXAMPLES -------------
    // ------------- GET: USER, USERS, HOUSE -------------
    // let users = await DB.getUsers();
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
  }
  return (
    <Container className="signup">
      <Grid container justify="center" spacing={spacing}>
        <Grid md={12} item>
          <h1>Dashboard Page</h1>
          <Button onClick={getHouses}>
            Show Houses
          </Button>
        </Grid>
        <Grid md={12} item>
          <Paper >
            <ul>{houses.map((house, i) => {
              return (<li key={`house-${i}`}>
                <ul>
                  <li>comps: {house.comps}</li>
                  <li>location: {house.location}</li>
                  <li>owner: {house.owner}</li>
                  <li>zpid: {house.zpid}</li>
                  <li>lastUpdated: {house.lastUpdated}</li>
                </ul>
              </li>)
            })}
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
