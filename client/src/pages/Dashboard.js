import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
// import { auth } from "../firebase";
import '../App.css';
import { Container } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CompList from '../components/Dashboard/CompList';
import CompDetails from '../components/Dashboard/CompDetails';
import MyHouse from '../components/Dashboard/MyHouse';

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

  return (
    <Container className='signup'>
      <Grid container spacing={2} style={{ padding: 24 }}>
        <Grid item xs={12} sm={6} lg={5} xl={4}>
        <Typography variant='h4' component='h2'>
            My House
          </Typography>
          <MyHouse />
        </Grid>
        <Grid item xs={12} sm={6} lg={5} xl={4}>
        <Typography variant='h4' component='h2'>
            Comps near Me
          </Typography>
          <CompDetails />
        </Grid>
        <Grid item xs={12} sm={6} lg={2} xl={3}>
        <Typography variant='h4' component='h2'>
            More
          </Typography>
          <CompList />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
