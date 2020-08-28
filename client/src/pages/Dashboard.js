import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
// import { auth } from "../firebase";
import '../App.css';
import { Container, Row, Button, Col } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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

function Home(props) {
  const { isAuth, logout } = useContext(AuthContext);

  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  return (
    <Container className='signup'>
      <Grid container justify='center' spacing={spacing}>
        {[0, 1, 2].map((value) => (
          <Grid key={value} item>
            <Paper className={classes.paper} />
          </Grid>
        ))}
      </Grid>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <h1>Home Page</h1>
          {isAuth ? (
            <>
              <Button
                className='m-1'
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
              >
                Logout
              </Button>
              <Button
                className='m-1'
                onClick={(e) => {
                  e.preventDefault();
                  props.history.push('/houses');
                }}
              >
                Houses
              </Button>
              <Button
                className='m-1'
                onClick={(e) => {
                  e.preventDefault();
                  props.history.push('/HouseAdditions');
                }}
              >
                Get your Estimate
              </Button>
            </>
          ) : (
            <>
              <Button
                className='m-1'
                onClick={(e) => {
                  e.preventDefault();
                  props.history.push('/login');
                }}
              >
                Login
              </Button>
              <Button
                className='m-1'
                onClick={(e) => {
                  e.preventDefault();
                  props.history.push('/signup');
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
