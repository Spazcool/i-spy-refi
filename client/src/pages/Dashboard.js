import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
// import { auth } from "../firebase";
import '../App.css';
import { Container } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CompList from '../components/Dashboard/CompList';
import CompDetails from '../components/Dashboard/CompDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  // control: {
  //   padding: theme.spacing(2),
  // },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
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
      <Grid container spacing={2} style={{ padding: 24 }}>
        <Grid item xs={12} sm={6} lg={4} xl={3}>
      Hello
        </Grid>
        <Grid item xs={12} sm={6} lg={4} xl={3}>
        <CompDetails />
        </Grid>
        <Grid item xs={12} sm={6} lg={4} xl={3}>
          <CompList />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
