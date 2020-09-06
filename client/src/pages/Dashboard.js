import React, { useState, useEffect, useContext } from 'react';
import { DB } from '../api/firestore';
import { AuthContext } from '../providers/AuthProvider';
import { zillow } from '../api/zillow';
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
  // House Display Info Logic - STEFFI
  const { user } = useContext(AuthContext);
  const [imageData, setImage] = useState([]);
  const [streetdisplay, setstreetdisplay] = useState('');
  const [citydisplay, setcitydisplay] = useState('');
  const [statedisplay, setstatedisplay] = useState('');
  const [FormData, setFormData] = useState([]);
  const [TrendingData, setTrendingData] = useState([]);
  const [compaddstreet, setcompaddstreet] = useState([]);
  const [description, setDescription] = useState('');
  const [totalHouseValue, settotalHouseValue] = useState('');
  const [hasHouse, setHasHouse] = useState(false);
  const [compestatedisplay, setcompstatedisplay] = useState('');
  const [complastsoldprice, setcomplastsoldprice] = useState('');
  const [complastsolddate, setcomplastsolddate] = useState('');

  // const finishedSqFt = '2466';
  let avgSqFt = 0;
  let avgPerSqFt = 0;

  const checkHasHouse = () => {
    const houseinfoDB = async () => await DB.getHouseByOwner(user.user.uid);
    let data;
    // User id is passed once the user login is completed
    // const [{ street, state, city, zip, hid, formdata, comps }] = await houseinfoDB();
    houseinfoDB()
      .then((data)=> {
        if (data.length > 0){
          data = {
            street,
            city,
            state,
            zip,
            hid,
            formdata,
            comps,
          };
          setHasHouse(true)
        }
      })
      .catch((err) => console.log('yo it broek'))


    setFormData([
      { country: 'Russia', area: 12 },
      { country: 'Canada', area: 7 },
      { country: 'USA', area: 7 },
      { country: 'China', area: 7 },
      { country: 'Brazil', area: 6 },
      { country: 'Australia', area: 5 },
      { country: 'India', area: 2 },
      { country: 'Others', area: 55 },
    ]);

    setTrendingData([
      { date: moment().subtract(30, 'days').format('DD-MM-YY'), value: 87654 },
      { date: moment().subtract(20, 'days').format('DD-MM-YY'), value: 45678 },
      {
        date: moment().subtract(10, 'days').format('DD-MM-YY'),
        value: 1234567,
      },
      { date: moment().format('DD-MM-YY'), value: 1098765 },
    ]);
  }
  
  const fetchaddress = async () => {
    if(checkHasHouse()){
      
    }
    /////////////////// FIRST API CALL /////////////////
    const displayaddress = await zillow.getaddress(data);

    const finishedsqftzillow = displayaddress[0].finishedSqFt;
    const statezillow = displayaddress[0].address.state;
    setstatedisplay(statezillow);
    const cityzillow = displayaddress[0].address.city;
    setcitydisplay(cityzillow);
    const streetzillow = displayaddress[0].address.street;
    setstreetdisplay(streetzillow);
    const zillowzpid = displayaddress[0].zpid;

    //////////////////////// SECOND CALL ///////////////////

    setTimeout(async () => {
      const getimageurl = await zillow.getzillowpropid(zillowzpid);
      setImage(getimageurl);
    }, 1200);

    //////////////////////// THIRD CALL ///////////////////
    // APi call to get house eval & 10 comparables
    setTimeout(async () => {
      const houseval = await zillow.gethouseval(zillowzpid);
      // console.log('gethouseval:', houseval.data);

      // const statestreetcomp = houseval.data.comparables[0].address.street;
      //  statestreetcomp = houseval.data;
      // console.log(statestreetcomp);
      setcompaddstreet(houseval.data.comparables);
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
      console.log(avgSqFt);
      avgPerSqFt = avgSqFt / index;

      console.log('avgpersqft:', avgPerSqFt);
      console.log(streetdisplay)
      // Calculating The House Value

      const tot = Math.round(finishedsqftzillow * avgPerSqFt);
      settotalHouseValue(tot);
      console.log('housevalue:', tot);

      console.log('avgsqft:', avgPerSqFt);
    }, 3000);
  };

  useEffect(() => {
    fetchaddress();
  }, []);

  return (

    <Container className='signup'>
      <Grid container spacing={3} className="grid">

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
          <CompList street={compaddstreet}/>
        </Grid>

        {/* --------------- CHARTS --------------- */}
        <Grid item xs={12} sm={6} lg={6} xl={6}>
          <Typography variant='h4' component='h2'>
            Refi Form Data Values
          </Typography>
          <FormChart data={FormData}/>
        </Grid>
        <Grid item xs={12} sm={6} lg={6} xl={6}>
          <Typography variant='h4' component='h2'>
            Comps Trending Data Values
          </Typography>
          <TrendingChart data={TrendingData}/>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
