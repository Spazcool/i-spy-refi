import React, { useState, useEffect, useContext } from 'react';
import { DB } from '../api/firestore';
import { AuthContext } from '../providers/AuthProvider';
import { realtor } from '../api/realtor';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import CompList from '../components/Dashboard/CompList';
import MyHouse from '../components/Dashboard/MyHouse';
import TrendingChart from '../components/Dashboard/TrendingChart';
import Toast from '../components/Toast';

import '../App.css';

function Home() {
  const { user, isAuth } = useContext(AuthContext);
  // TOAST
  const [openIt, setOpenIt] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  // DB
  const [hasHouse, setHasHouse] = useState();
  // const [houseData, setHouseData] = useState({});
  const [RenovationValue, setRenovationValue] = useState('');
  const [finalHouseAssessmentValue, setfinalHouseAssessmentValue] = useState(
    ''
  );
  const [formData, setFormData] = useState([]);

  const [TrendingData, setTrendingData] = useState([]);
  // API
  const [imageData, setImage] = useState('');
  const [streetdisplay, setstreetdisplay] = useState('');
  const [citydisplay, setcitydisplay] = useState('');
  const [statedisplay, setstatedisplay] = useState('');
  const [compsList, setcompsList] = useState([]);
  const [totalHouseValue, settotalHouseValue] = useState('');
  const [mortgageRatesDisplay, setMorgageRatesDisplay] = useState([]);
  const [realtorPrice, setrealtorPrice] = useState('');

  let finishedsqFt;
  let zipCode;
  let renVal;
  let Realtorprice;
  // let mortgageRates;

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
      getMortgageRates(data.zip);
      setHasHouse(true);
      // setHouseData(data);
      setTrendingData(comps);
      setstreetdisplay(data.street);
      setstatedisplay(data.state);
      setcitydisplay(data.city);

      zipCode = data.zip;
      renVal = data.formData;
      console.log(data.formData);
      setFormData(data.formData);
      // return true;
      console.log(data);
      return data;
    }

    setHasHouse(false);
    return false;
  };

  const checkHasHouseInAPI = async (house) => {
    // console.log('house', house);
    const getAddress = async () => await realtor.getAddressDetails(house.zpid);
    const addressResponse = await getAddress();
    // console.log(addressResponse);

    if (addressResponse !== undefined) {
      // console.log(addressResponse);
      const getimageurl = addressResponse.data.properties[0].photos[0].href;
      setImage(getimageurl);
      // Storing Realtor House Price

      Realtorprice = addressResponse.data.properties[0].price;
      setrealtorPrice(Realtorprice);

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

  const getMortgageRates = async (zip) => {
    let mortgageRates = await realtor.getMortgageRates();
    setMorgageRatesDisplay(mortgageRates);
    // TO DO add ERROR handling
  };

  const checkHouseCompsInAPI = async (address) => {
    const { city, state_code } = address.data.properties[0].address;

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
      if (
        responsehouse.hasOwnProperty('building_size') &&
        responsehouse.building_size.size > 0
      ) {
        houseprice_array.push(
          parseInt(responsehouse.price / responsehouse.building_size.size)
        );
      }
    });

    // if (houseprice_array.length > 0) {
    const housearraymedian = houseprice_array.sort((a, b) => a - b);
    const mid = Math.floor(housearraymedian.length / 2);
    const housemedian =
      housearraymedian.length % 2 !== 0
        ? housearraymedian[mid]
        : (housearraymedian[mid - 1] + housearraymedian[mid]) / 2;

    const FinalHouseValue = finishedsqFt * housemedian;

    settotalHouseValue(FinalHouseValue);
    findHouseRenovation(renVal, FinalHouseValue);
    // } else {
    //   settotalHouseValue(0);
    //   findHouseRenovation([], 0);
    // }
  };

  const findHouseRenovation = (FormData, FinalHouseValue) => {
    let index = FormData.length - 1;

    let RenoValue = index > 0 ? FormData[index].RenovationValue : 0;
    let FinalHouseAssessmentValue =
      FinalHouseValue > 0
        ? FinalHouseValue + RenoValue
        : Realtorprice + RenoValue;
    console.log('ChkReno:', FinalHouseAssessmentValue);
    setRenovationValue(RenoValue);
    setfinalHouseAssessmentValue(FinalHouseAssessmentValue);
  };

  const setCompsListFromAPI = (properties) => {
    let compsarray = [];

    for (let i = 0; i < 10; i++) {
      if (properties[i] !== undefined) {
        compsarray.push(properties[i]);
      }
    }

    setcompsList(compsarray);
  };

  const makeToast = (msg) => {
    setToastMessage(msg);
    setOpenIt(true);
    setOpenIt(false);
  };

  const fetchAllData = async () => {
    checkHasHouseInDB()
      .then((res) => {
        if (res !== false) {
          checkHasHouseInAPI(res)
            .then((resp) => {
              if (resp === false) {
                makeToast("House ID doesn't exist.");
              } else {
                checkHouseCompsInAPI(resp)
                  .then((respo) => {
                    if (respo === false) {
                      makeToast('No similar houses in your area.');
                    }
                  })
                  .catch((err) => {
                    makeToast(err.message);
                  });
              }
            })
            .catch((err) => {
              makeToast("House ID doesn't exist.");
            });
        } else {
          throw new Error('No house associated with user.');
        }
      })
      .catch((err) => {
        makeToast(err.message);
      });
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
      <div className='row'></div>
      <Grid container spacing={3} className='grid'>
        {/* --------------- USERS HOUSE --------------- */}
        <Grid item xs={12} sm={5} lg={5} xl={5}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={12}
            xl={12}
            style={{ paddingTop: '20px' }}
          >
            <Typography
              align='center'
              variant='h4'
              component='h2'
              className='fontCinzelBlack'
            >
              <span className='fontCinzelLgNoShadow'> House Assessment</span>
            </Typography>
            <MyHouse
              className='card'
              street={streetdisplay}
              city={citydisplay}
              state={statedisplay}
              imageData={imageData}
              value={totalHouseValue}
              reno={RenovationValue}
              finalhousevalue={finalHouseAssessmentValue}
              realtorprice={realtorPrice}
              formData={formData}
              financeRates={mortgageRatesDisplay}
            />
          </Grid>
        </Grid>

        {/* --------------- COMPS --------------- */}
        <Grid item xs={12} sm={6} lg={6} xl={6}>
          <Typography
            align='center'
            variant='h4'
            component='h2'
            className='fontCinzelLgNoShadow'
            style={{ paddingTop: '20px' }}
          >
            <span className='fontCinzelLgNoShadow'> Homes In Area</span>
          </Typography>
          <CompList compslist={compsList} />
        </Grid>

        {/* --------------- CHART2 --------------- */}
        {/* <Grid item xs={12} sm={6} lg={6} xl={6}>
          <Typography variant='h4' component='h2'>
            Refi Form Data Values
          </Typography> */}
        {/* <FormChart data={FormData} /> */}
        {/* </Grid> */}
        {/* --------------- CHART1 --------------- */}
        {/* <Grid item xs={12} sm={12} lg={12} xl={12}>
          <h2 className='fontCinzelWhite chart'>Comps Trending Data Values</h2> */}
        {/* <TrendingChart data={TrendingData} /> */}
        {/* </Grid> */}
      </Grid>
      <Toast openIt={openIt} message={toastMessage} />
    </Container>
  );
}

export default Home;
