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
    // let house = await DB.getHouse(zpid); // todo not sure when in the process the zpid will be comeing from, maybe from the user
    // let userDB = await DB.getUser(user.user.uid);

    // ------------- CREATE: HOUSE -------------
    // FYI: USER CREATION HAPPENS AT SIGNUP/LOGIN IF YOU WANT TO SEE IT IN ACTION
    // const houseData = {
    //   zpid: 456789,
    //   location: [50, 42]
    //   comps: []
    // }
    // let house = await DB.createHouse(user.user.uid, houseData)
    // console.log(house.id)

    // ------------- UPDATE -------------
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
    const houseData = {
      zpid: 456780,
      comps: [{something: 'else'}],
    }
    let updateHouse = async () => await DB.updateHouse(houseData)
    updateHouse();
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
