import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

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
  const { isAuth, logout } = useContext(AuthContext);
  // const [spacing, setSpacing] = React.useState(2);
  
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

  const trendingData = {
    x: 2,
    y: 25,
    z: 1,
  };

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
          <CompList />
        </Grid>

        {/* --------------- CHARTS --------------- */}
        <Grid item xs={12} sm={6} lg={6} xl={6}>
          <Typography variant='h4' component='h2'>
            Refi Form Data Values
          </Typography>
          <FormChart data={formData}/>
        </Grid>
        <Grid item xs={12} sm={6} lg={6} xl={6}>
          <Typography variant='h4' component='h2'>
            Comps Trending Data Values
          </Typography>
          <TrendingChart data={trendingData}/>
        </Grid>

      </Grid>
    </Container>
  );
}

export default Home;
