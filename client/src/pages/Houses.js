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
    let houses = await DB.getHouses();
    setHouses(houses)

    // ------------- EXAMPLES -------------
    // ------------- GET -------------
    // let users = await DB.getUsers();
    // let house = await DB.getHouse(zpid); // todo not sure when in the process the zpid will be comeing from, maybe from the user
    // let userDB = await DB.getUser(user.user.uid);

    // ------------- CREATE -------------
    // const houseData = {
    //   zpid: 456789,
    //   location: [50, 42],
    //   comps: []
    // }
    // let house = await DB.createHouse(user.user.uid, houseData)
    // console.log(house.id)
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
