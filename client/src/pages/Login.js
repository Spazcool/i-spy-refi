import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom'
import '../App.css';
import { AuthContext } from "../providers/AuthProvider";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col';
import LoginEmail from '../components/LoginEmail'
import LoginGoogle from '../components/LoginGoogle';

function Login(props) {

  const { isAuth } = useContext(AuthContext)

  console.log("login auth: ", isAuth)

  return (
      isAuth ? <Redirect to='/' />
        :
        <Container className="signup">
          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <LoginGoogle/>
              <LoginEmail {...props}/>
            </Col>
          </Row>
        </Container>
  );
}

export default Login;