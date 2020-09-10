import React, { useState, useEffect, useContext } from 'react';
import { DB } from '../api/firestore';
import { AuthContext } from '../providers/AuthProvider';
import { realtor } from '../api/realtor';
import '../../src/App.css';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CompList from '../components/Dashboard/CompList';
import MyHouse from '../components/Dashboard/MyHouse';
import FormChart from '../components/Dashboard/FormChart';
import TrendingChart from '../components/Dashboard/TrendingChart';

import '../App.css';

function Home(props) {
  console.log(props);
  const { user, isAuth } = useContext(AuthContext);
  // DB
  const [hasHouse, setHasHouse] = useState(false);
  const [houseData, setHouseData] = useState({});
  const [FormData, setFormData] = useState([]);
  const [TrendingData, setTrendingData] = useState([]);
  // API
  const [imageData, setImage] = useState([]);
  const [streetdisplay, setstreetdisplay] = useState('');
  const [citydisplay, setcitydisplay] = useState('');
  const [statedisplay, setstatedisplay] = useState('');
  const [compsList, setcompsList] = useState([]);
  const [PID, setPID] = useState('');
  const [description, setDescription] = useState('');
  const [totalHouseValue, settotalHouseValue] = useState('');

  const [sqFeet, setSqFeet] = useState('');
  // const [compaddstreet, setcompaddstreet] = useState([]);
  // const [compestatedisplay, setcompstatedisplay] = useState('');
  // const [complastsoldprice, setcomplastsoldprice] = useState('');
  // const [complastsolddate, setcomplastsolddate] = useState('');

  let finishedsqFt;

  const checkHasHouseInDB = async () => {
    const houseinfoDB = async () => await DB.getHouseByOwner(user.user.uid);
    const house = await houseinfoDB();

    if (house.length > 0) {
      const [{ street, state, city, zip, hid, zpid, formData, comps }] = house;
      const data = {
        street,
        city,
        state,
        zip,
        hid,
        zpid,
        formData,
        comps,
      };
      console.log(formData);
      setHasHouse(true);
      setHouseData(data);
      setFormData(formData);
      setTrendingData(comps);
      setstreetdisplay(data.street);
      setstatedisplay(data.state);
      setcitydisplay(data.city);

      // return true;
      return data;
    }
    return false;
  };

  const checkHasHouseInAPI = async (house) => {
    console.log(house);
    const getAddress = async () => await realtor.getAddressDetails(house.zpid);
    const addressResponse = await getAddress();
    console.log(addressResponse);

    if (addressResponse !== undefined) {
      console.log(addressResponse);
      const getimageurl = addressResponse.data.properties[0].photos[0].href;
      setImage(getimageurl);

      let housebuildingsizeValid = addressResponse.data.properties[0];
      if (
        housebuildingsizeValid.hasOwnProperty('building_size') &&
        housebuildingsizeValid.building_size.size > 0
      ) {
        finishedsqFt = housebuildingsizeValid.building_size.size;
      }
      return addressResponse;
      // return true;
    }
    return false;
  };

  const checkHouseCompsInAPI = async (address) => {
    const { city, state_code } = address.data.properties[0].address;
    console.log(address);
    console.log(address.data.properties[0].address.city);
    console.log(address.data.properties[0].address.state_code);

    const gethouseResponse = await realtor.gethousevalue(city, state_code);
    if (gethouseResponse !== undefined) {
      findTotalHouseValue(gethouseResponse);
      setCompsListFromAPI(gethouseResponse.data.properties);
      return true;
    }
    return false;
  };

  const findTotalHouseValue = (list) => {
    let houseprice_array = [];
    let responsehouses = list.data.properties;

    responsehouses.forEach((responsehouse) => {
      //   console.log('responsehouse', responsehouse);
      //   const result = responsehouse.hasOwnProperty('building_size');
      //   console.log('result:', result);
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

    const FinalHouseValue = finishedsqFt * housemedian;

    settotalHouseValue(FinalHouseValue);
  };

  const setCompsListFromAPI = (properties) => {
    let compsarray = [];

    for (let i = 0; i < 10; i++) {
      compsarray.push(properties[i]);
    }

    setcompsList(compsarray);
    console.log('dashboardcomp:', compsList);
  };

  const fetchAllData = async () => {
    checkHasHouseInDB()
      .then((res) => {
        checkHasHouseInAPI(res)
          .then((resp) => {
            checkHouseCompsInAPI(resp);
          })
          .catch((err) => console.log('broke api house', err));
      })
      .catch((err) => console.log('broke hosue db', err));

    // if(await checkHasHouseInDB() === false){
    //   console.log('user deosnt have a house in db')
    // }else{
    //   console.log('user has house in db')
    // }
    // if(await checkHasHouseInAPI() === false){
    //   console.log('user deosnt have a house in API')
    // }else{
    //   console.log('user has hous in api')
    // }
    // if(await checkHouseCompsInAPI() === false){
    //   console.log('user doesnt have comps')
    // }else{
    //   console.log('house has comps')
    // }
  };

  useEffect(() => {
    if (isAuth) {
      fetchAllData();
    } else {
      //todo error toast
    }
  }, []);

  return (
    <Container className='signup'>
      <Grid container spacing={3} className='grid'>
        {/* --------------- USERS HOUSE --------------- */}
        <Grid item xs={12} sm={5} lg={5} xl={5}>
          <Typography
            align='center'
            variant='h4'
            component='h2'
            className='fontCinzelBlack'
          >
            <h2 className='fontCinzelWhite'> House Assessment</h2>
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
          <Typography
            align='center'
            variant='h4'
            component='h2'
            class='fontCinzelWhite'
          >
            Similar Homes
          </Typography>
          <CompList compslist={compsList} />
        </Grid>

        {/* --------------- CHARTS --------------- */}
        <Grid item xs={12} sm={6} lg={6} xl={6}>
          <Typography variant='h4' component='h2'>
            Refi Form Data Values
          </Typography>
          {/* <FormChart data={FormData} /> */}
        </Grid>
        <Grid item xs={12} sm={6} lg={6} xl={6}>
          <Typography variant='h4' component='h2'>
            Comps Trending Data Values
          </Typography>
          {/* <TrendingChart data={TrendingData} /> */}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
