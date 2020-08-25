import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { firestore } from "../firebase";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../App.css";

const Houses = props => {
  // Destructure the logout function from AuthContext
  const { logout } = useContext(AuthContext);
  const [houses, setHouses] = useState([]);

  const getHouses = async () => {
    // const myHouse = firestore.collection('houses').doc('qrSHMjWUlWMKKSrcrTUJ');
    // const query = housesList.where('value', '>', 100000);
    const housesList = firestore.collection('houses');
    const query = housesList.orderBy('value', 'desc');
    query.get()
      .then((houses) => {
        //FYI houses IS AN OBJ, SO YOU CAN'T MAP OVER IT
        let properties = [];
        houses.forEach(house => {
          properties.push(house.data())
        })
        setHouses(properties)
      })
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
