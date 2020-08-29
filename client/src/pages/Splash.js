import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import "../App.css";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

function Splash(props) {
  const [spacing] = React.useState(2);
  const classes = useStyles();

  return (
    <Container>
       <h1>Home Page</h1>
      <Grid container justify="center" spacing={spacing}>
        <Grid item>
          <Paper className={classes.paper}>things</Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>to</Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>come</Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Splash;
