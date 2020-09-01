import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import moment from 'moment';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import CompList from '../components/Dashboard/CompList';
import CompDetails from '../components/Dashboard/CompDetails';
import MyHouse from '../components/Dashboard/MyHouse';
import FormChart from '../components/Dashboard/FormChart';
import TrendingChart from '../components/Dashboard/TrendingChart';

import { makeStyles } from '@material-ui/core/styles';
import '../App.css';

function Home(props) {
  const { isAuth, logout, user } = useContext(AuthContext);
  const [spacing, setSpacing] = React.useState(2);

  // TODO THIS DATA WILL BE COMING FROMTHE DB
  const formData = [
    { country: 'Russia', area: 12 },
    { country: 'Canada', area: 7 },
    { country: 'USA', area: 7 },
    { country: 'China', area: 7 },
    { country: 'Brazil', area: 6 },
    { country: 'Australia', area: 5 },
    { country: 'India', area: 2 },
    { country: 'Others', area: 55 },
  ];

  // moment().format("dddd, MMMM Do YYYY, h:mm:ss a"); // "Sunday, February 14th 2010, 3:25:50 pm"
  console.log(
    moment().subtract(10, 'days').format('dddd, MMMM Do YYYY, h:mm:ss a')
  );
  const trendingData = [
    { date: moment().subtract(30, 'days').format('DD-MM-YY'), value: 87654 },
    { date: moment().subtract(20, 'days').format('DD-MM-YY'), value: 45678 },
    { date: moment().subtract(10, 'days').format('DD-MM-YY'), value: 1234567 },
    { date: moment().format('DD-MM-YY'), value: 1098765 },
  ];

  return (
    <Container className='signup'>
      <Grid container spacing={2} style={{ padding: 24 }}>
        {/* --------------- USERS HOUSE --------------- */}
        <Grid item xs={12} sm={5} lg={4} xl={4}>
          <Typography variant='h4' component='h2'>
            My House
          </Typography>
          <MyHouse />
        </Grid>

        {/* --------------- COMPS --------------- */}
        <Grid item xs={12} sm={7} lg={6} xl={4}>
          <Typography variant='h4' component='h2'>
            Comps near Me
          </Typography>
          <CompDetails />
        </Grid>
        <Grid item xs={12} sm={6} lg={2} xl={3}>
          <Typography variant='h4' component='h2'>
            More
          </Typography>
          <CompList user={user} />
        </Grid>

        {/* --------------- CHARTS --------------- */}
        <Grid item xs={12} sm={6} lg={6} xl={6}>
          <Typography variant='h4' component='h2'>
            Refi Form Data Values
          </Typography>
          <FormChart data={formData} />
        </Grid>
        <Grid item xs={12} sm={6} lg={6} xl={6}>
          <Typography variant='h4' component='h2'>
            Comps Trending Data Values
          </Typography>
          <TrendingChart data={trendingData} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
