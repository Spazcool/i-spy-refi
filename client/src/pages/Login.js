import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom'
import '../App.css';
import { AuthContext } from "../providers/AuthProvider";

import LoginOptions from '../components/Login.js'

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

function Login(props) {
  const { isAuth } = useContext(AuthContext)
  const [spacing] = React.useState(2);

  return (
    isAuth ? 
      <Redirect to='/dashboard' />
      :
      <Container className="signup">
          <h1>Login Page</h1>
        <Grid container justify="center" spacing={spacing}>
          <Grid item xs={12} md={6}>
            <LoginOptions {...props}/>
          </Grid>
        </Grid>
      </Container>
  );
}

export default Login;