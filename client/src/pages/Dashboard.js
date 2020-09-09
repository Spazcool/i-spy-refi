import React, { useState, useEffect, useContext } from 'react';
import { DB } from '../api/firestore';
import { AuthContext } from '../providers/AuthProvider';
import { realtor } from '../api/realtor';
import moment from 'moment'; //for fake data, can be removed or used elsewhere when the fake data is pulled out

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import CompList from '../components/Dashboard/CompList';
import MyHouse from '../components/Dashboard/MyHouse';
import FormChart from '../components/Dashboard/FormChart';
import TrendingChart from '../components/Dashboard/TrendingChart';

import '../App.css';

function Home(props) {
  const { user } = useContext(AuthContext);

  // API
  const [imageData, setImage] = useState([]);
  const [streetdisplay, setstreetdisplay] = useState('');
  const [citydisplay, setcitydisplay] = useState('');
  const [statedisplay, setstatedisplay] = useState('');
  const [FormData, setFormData] = useState([]);
  const [TrendingData, setTrendingData] = useState([]);
  const [compsList, setcompsList] = useState([]);
  const [totalHouseValue, settotalHouseValue] = useState('');

  const [sqFeet, setSqFeet] = useState('');

  let renovationHouseValue;

  useEffect(() => {
    fetchaddress();
  }, []);

  const fetchaddress = async () => {
    const houseinfoDB = async () => await DB.getHouseByOwner(user.user.uid);
    const house = await houseinfoDB();

    // User id is passed once the user login is completed
    const [
      { street, state, city, formData, houseImage, building_size },
    ] = await houseinfoDB();

    //     // TODO THIS DATA WILL BE COMING FROMTHE DB

    //     const formData = [
    //       { country: 'Russia', value: 8765 },
    //       { country: 'Canada', value: 7 },
    //       { country: 'USA', value: 7 },
    //       { country: 'China', value: 7 },
    //       { country: 'Brazil', value: 6 },
    //       { country: 'Australia', value: 5 },
    //       { country: 'India', value: 2 },
    //       { country: 'Others', value: 55 },
    //     ];

    //     setFormData(formData);

    //     setTrendingData([
    //       { date: moment().subtract(30, 'days').format('DD-MM-YY'), value: 87654 },
    //       { date: moment().subtract(20, 'days').format('DD-MM-YY'), value: 45678 },
    //       {
    //         date: moment().subtract(10, 'days').format('DD-MM-YY'),
    //         value: 1234567,
    //       },
    //       { date: moment().format('DD-MM-YY'), value: 1098765 },
    //     ]);

    const statedb = state;
    setstatedisplay(statedb);
    const citydb = city;
    setcitydisplay(citydb);

    const streetdb = street;
    setstreetdisplay(streetdb);

    setImage(houseImage);

    // FIRST API CALL //

    const gethouseResponse = await realtor.gethousevalue(citydb, statedb);

    let houseprice_array = [];
    let responsehouses = gethouseResponse.data.properties;

    responsehouses.forEach((responsehouse) => {
      if (
        responsehouse.hasOwnProperty('building_size') &&
        responsehouse.building_size.size > 0
      ) {
        houseprice_array.push(
          parseInt(responsehouse.price / responsehouse.building_size.size)
        );
      }
    });

    const housearraymedian = houseprice_array.sort((a, b) => a - b);

    const mid = Math.floor(housearraymedian.length / 2);
    const housemedian =
      housearraymedian.length % 2 !== 0
        ? housearraymedian[mid]
        : (housearraymedian[mid - 1] + housearraymedian[mid]) / 2;

    
    // RenovationHouseValue
    renovationHouseValue = formData.renovationValue.value;
    console.log('formvalue:', renovationHouseValue);

    const FinalHouseValue = ((building_size * housemedian)+renovationHouseValue);
    settotalHouseValue(FinalHouseValue);

    // COMPS LOGIC //
    let compsarray = [];

    for (let i = 0; i < 10; i++) {
      compsarray.push(gethouseResponse.data.properties[i]);

      // console.log(compsarray);
    }
    setcompsList(compsarray);
  };
  return (
    <Container className='signup'>
      <Grid container spacing={3} className='grid'>
        {/* --------------- USERS HOUSE --------------- */}
        <Grid item xs={12} sm={5} lg={5} xl={5}>
          <Typography variant='h4' component='h2'>
            My House
          </Typography>
          <MyHouse
            className='card'
            street={streetdisplay}
            city={citydisplay}
            state={statedisplay}
            imageData={imageData}
            value={totalHouseValue}
          />
        </Grid>

        {/* --------------- COMPS --------------- */}
        <Grid item xs={12} sm={6} lg={6} xl={6}>
          <Typography variant='h4' component='h2'>
            Comps
          </Typography>
          <CompList compslist={compsList} />
        </Grid>

        {/* --------------- CHARTS --------------- */}
        <Grid item xs={12} sm={6} lg={6} xl={6}>
          <Typography variant='h4' component='h2'>
            Refi Form Data Values
          </Typography>
          <FormChart data={FormData} />
        </Grid>
        <Grid item xs={12} sm={6} lg={6} xl={6}>
          <Typography variant='h4' component='h2'>
            Comps Trending Data Values
          </Typography>
          <TrendingChart data={TrendingData} />
        </Grid>
      </Grid>
    </Container>
  );
}
export default Home;
