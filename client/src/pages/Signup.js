import React, {useContext} from 'react'
import { AuthContext } from "../providers/AuthProvider";
import { Redirect } from 'react-router-dom'
import "../App.css";
import SignupForm from "../components/SignupForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Signup(props) {
  const { isAuth } = useContext(AuthContext)

  return (
    isAuth ? <Redirect to='/' />
    :
    <Container className="signup">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <SignupForm {...props} />
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
