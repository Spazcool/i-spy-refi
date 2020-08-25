import React, { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
// import { auth } from "../firebase";
import "../App.css";
import { Container, Row, Button, Col } from "react-bootstrap";

function Home(props) {
  
  const { isAuth, logout } = useContext(AuthContext);

  return (
    <Container className="signup">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1>Home Page</h1>
          {isAuth ? (
            <>
              <Button
                className="m-1"
                onClick={e => {
                  e.preventDefault();
                  logout();
                }}
              >
                Logout
              </Button>
              <Button
                className="m-1"
                onClick={e => {
                  e.preventDefault();
                  props.history.push("/houses");
                }}
              >
                Houses
              </Button>
            </>
          ) : (
            <>
              <Button
                className="m-1"
                onClick={e => {
                  e.preventDefault();
                  props.history.push("/login");
                }}
              >
                Login
              </Button>
              <Button
                className="m-1"
                onClick={e => {
                  e.preventDefault();
                  props.history.push("/signup");
                }}
              >
                Signup
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
