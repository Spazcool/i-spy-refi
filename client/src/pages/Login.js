import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { DB } from '../api/firestore.js';

import { AuthContext } from '../providers/AuthProvider';

import LoginOptions from '../components/Login.js';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import '../App.css';

function Login(props) {
  const { isAuth, user } = useContext(AuthContext);
  const [userHouse, setHouse] = useState('');
  const [spacing] = React.useState(2);

  const fetchHouse = async () => {
    const house = async () => await DB.getHouseByOwner(user.user.uid);
    const [userHouse] = await house();
    setHouse(userHouse);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted && isAuth) {
      fetchHouse();
    }
    return () => (mounted = false);
  }, [isAuth]);

  if (userHouse && isAuth) {
    return <Redirect to='/dashboard' />;
  } else if (userHouse === undefined && isAuth) {
    return <Redirect to='/additions' />;
  } else {
    return (
      <Container className='signup'>
        <h1>Login Page</h1>
        <Grid container justify='center' spacing={spacing}>
          <Grid item xs={12} md={6}>
            <LoginOptions {...props} />
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default Login;
