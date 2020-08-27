import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
// import { firestore } from "../firebase";
import { DB } from "../api/firestore.js";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../App.css";

const Houses = props => {
  // Destructure the logout function from AuthContext
  const { logout, user} = useContext(AuthContext);
  const [houses, setHouses] = useState([]);

  const getHouses = async () => {
    // ------------- DESIRED DB CALL -------------
    // TO TEST OUT THE EXAMPLES BELOW, COMMENT OUT THE NEXT 2 LINES & UNCOMMENT THE APPROPRIATE EXAMPLE + THE CONSOLE LOG
    // let houses = await DB.getHouses();
    // setHouses(houses)

    // ------------- EXAMPLES -------------
    // ------------- GET: USER, USERS, HOUSE -------------
    // let users = await DB.getUsers();
    // let house = await DB.getHouse(id); // DB colleciton id NOT the zpid
    // let userDB = await DB.getUser(user.user.uid); //returns current logged in user, for a list of users ids you'll need to call DB.getUsers() first

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
    let deleteUser = async () => await DB.deleteUser('Aq448iAgi9UeWs7Sv7Iv') 
    deleteUser();

    // let deleteHouse = async () => await DB.deleteHouse('iN89T5GcCeCJcx1oPrdV') // 
    // deleteHouse();
  }
  return (
    <Container className="signup">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1>HOUSES Page</h1>
          <Button
            className="m-1"
            onClick={() => {
              logout();
              setHouses([]);
            }}
          >
            Logout
          </Button>
          <Button
            className="m-1"
            onClick={() => {
              props.history.push("/");
            }}
          >
            Home
          </Button>
          <Button className="m-1" onClick={getHouses}>
            Show Houses
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <ul>{houses.map((house, i) => <li key={`house-${i}`}>value: {house.value}</li>)}</ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Houses;
