import React, { useState, useEffect, useContext } from 'react';
import { DB } from '../api/firestore';
import { AuthContext } from '../providers/AuthProvider';
import { zillow } from '../api/zillow';
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
  const [PID, setPID] = useState('');
  const [description, setDescription] = useState('');
  const [totalHouseValue, settotalHouseValue] = useState('');
  const [sqFeet, setSqFeet] = useState('');
  const [compaddstreet, setcompaddstreet] = useState([]);
  const [compestatedisplay, setcompstatedisplay] = useState('');
  const [complastsoldprice, setcomplastsoldprice] = useState('');
  const [complastsolddate, setcomplastsolddate] = useState('');

  let avgSqFt = 0;
  let avgPerSqFt = 0;

  const checkHasHouse = async () => {
    const houseinfoDB = async () => await DB.getHouseByOwner(user.user.uid);
    const house = await houseinfoDB();

    if (house.length > 0) {
      const [{ street, state, city, zip, hid, formData, comps }] = house;
      const data = {
        street,
        city,
        state,
        zip,
        hid,
        formdata,
        comps,
      };
      setHasHouse(true);
      setHouseData(data);
      setFormData(formdata);
      setTrendingData(comps);

      return true;
    }
    return false;
  };

  const fetchAddressApi = async () => {
    const apiAddress = await zillow.getaddress(houseData);

    if (apiAddress !== undefined) {
      console.log('add ');

      const finishedsqftzillow = apiAddress[0].finishedSqFt;
      const statezillow = apiAddress[0].address.state;
      const cityzillow = apiAddress[0].address.city;
      const streetzillow = apiAddress[0].address.street;
      const zillowzpid = apiAddress[0].zpid;

      setSqFeet(finishedsqftzillow);
      setstatedisplay(statezillow);
      setcitydisplay(cityzillow);
      setstreetdisplay(streetzillow);
      setPID(zillowzpid);

      return true;
    }
    return false;
  };

  const fetchAddressImageApi = async () => {
    const getimageurl = await zillow.getzillowpropid(PID);
    if (getimageurl !== undefined) {
      console.log('img ');

      setImage(getimageurl);
      return true;
    }
    setImage('http://placekitten.com/200/300');
    return false;
  };

  const fetchAddressEval = async () => {
    // APi call to get house eval & 10 comparables
    const houseval = await zillow.gethouseval(PID);
    if (houseval !== undefined) {
      console.log('eval ');
      // console.log('gethouseval:', houseval.data);
      // const statestreetcomp = houseval.data.comparables[0].address.street;
      //  statestreetcomp = houseval.data;
      // console.log(statestreetcomp);
      // setcompaddstreet(houseval.data.comparables);
      // const cityzillow = displayaddress[0].address.city;
      // setcitydisplay(cityzillow);
      // const streetzillow = displayaddress[0].address.street;
      // setstreetdisplay(streetzillow);
      // const zillowzpid = displayaddress[0].zpid;

      let comlength = houseval.data.comparables.length;
      //console.log('complength' + comlength);
      // calculating the Average SqFt
      let index = 0;

      for (let i = 0; i < comlength; i++) {
        avgSqFt +=
          houseval.data.comparables[i].lastSoldPrice.value /
          houseval.data.comparables[i].finishedSqFt;
        index = i + 1;
      }
      avgPerSqFt = avgSqFt / index;
      // console.log(avgSqFt);
      // console.log('avgpersqft:', avgPerSqFt);
      // console.log(streetdisplay)
      // Calculating The House Value
      const tot = Math.round(sqFeet * avgPerSqFt);
      settotalHouseValue(tot);
      // console.log('housevalue:', tot);
      // console.log('avgsqft:', avgPerSqFt);
      return true;
    }
    return false;
  };

  const fetchaddress = async () => {
    /////////////////// DB CALL /////////////////
    if ((await checkHasHouse()) === false) {
      console.log('user doesnt have a house');
      //todo create a toast OR modal telling the user to go make a ahouse
    }
    /////////////////// FIRST API CALL /////////////////
    if ((await fetchAddressApi()) === false) {
      console.log('didnt find house via API');
      //todo createa  toast OR modal suggesting ... maybe an edit to the hosueaddress
    }
    ////////////////////// SECOND CALL ///////////////////
    if ((await fetchAddressImageApi()) === false) {
      console.log('didnt find image for house via api');
    }
    //////////////////////// THIRD CALL ///////////////////
    if ((await fetchAddressEval()) === false) {
      console.log('faled to grab house eval');
      //todo toast 'somethign went wrong'
    }
  };

  useEffect(() => {
    // fetchaddress();
  }, []);

  return (
    <Container className='signup'>
      <Grid container spacing={3} className='grid'>
        {/* --------------- USERS HOUSE --------------- */}
        <Grid item xs={12} sm={5} lg={5} xl={5}>
          <Typography variant='h4' component='h2'>
            My House
          </Typography>
          <MyHouse
            street={streetdisplay}
            city={citydisplay}
            state={statedisplay}
            imageData={imageData}
            value={totalHouseValue}
            description={description}
          />
        </Grid>

        {/* --------------- COMPS --------------- */}
        <Grid item xs={12} sm={6} lg={6} xl={6}>
          <Typography variant='h4' component='h2'>
            Comps
          </Typography>
          <CompList street={compaddstreet} />
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
