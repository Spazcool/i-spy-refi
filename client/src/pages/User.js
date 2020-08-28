import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom'

import { AuthContext } from "../providers/AuthProvider";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import '../App.css';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    // height: 140,
    // width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function User(props) {

  const { isAuth, user } = useContext(AuthContext)
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  return (
    !isAuth ? 
      <Redirect to='/' />
      :
      <Container className="signup">
          <h1>User Page</h1>
        <Grid container justify="center" spacing={spacing}>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>user information</Paper>
          </Grid>
        </Grid>
      </Container>
  );
}

export default User;