import React, { useState, useContext, useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

import { DB } from '../api/firestore';
import { AuthContext } from '../providers/AuthProvider';
import { realtor } from '../api/realtor';

import AddHouse from '../components/HouseAdditions/AddHouse';
import AddRenos from '../components/HouseAdditions/AddRenos';
import FormChart from '../components/Dashboard/FormChart';
import Toast from '../components/Toast';

import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  alignContent: {
    display: 'flex',
    textAlign: 'center',
  },
}));

const nationalAverages = [
  {
    id: 'kitchen',
    minor: { value: '14600', type: 'minor' },
    major: { value: '39900', type: 'major' },
    noSelection: { value: '0', type: 'N/A' },
    description: 'Kitchen: includes cabinets, fridge, etc...',
  },
  {
    id: 'roof',
    minor: { value: '12777', type: 'asphalt' },
    major: { value: '21731', type: 'metal' },
    noSelection: { value: '0', type: 'N/A' },
    description: 'Roof: new shingles?',
  },
  {
    id: 'bathroom',
    minor: { value: '10700', type: 'minor' },
    major: { value: '24300', type: 'major' },
    noSelection: { value: '0', type: 'N/A' },
    description: 'Bathroom: includes toilet, tub, tiles, etc...',
  },
  {
    id: 'attic',
    minor: { value: '0', type: 'No' },
    major: { value: '36700', type: 'Yes' },
    description: 'Attic: bedroom conversion?',
  },
  {
    id: 'landscaping',
    minor: { value: '0', type: 'No' },
    major: { value: '4900', type: 'Yes' },
    description: 'Landscaping: includes trees, mulch, walkway, etc...',
  },
  {
    id: 'door',
    minor: { value: '0', type: 'No' },
    major: { value: '1280', type: 'Yes' },
    description: 'Entry door replacement?',
  },
  {
    id: 'deck_patio_porch',
    minor: { value: '0', type: 'No' },
    major: { value: '10000', type: 'Yes' },
    description: 'Deck, patio or porch installation?',
  },
];

export default withRouter(function HouseAdditions(props) {
  const classes = useStyles();
  const biggerThanMobile = useMediaQuery('(min-width:600px)');
  const { user, isAuth } = useContext(AuthContext);
  // ------------ INPUT VALIDATION ------------
  const errorMessage = '* all fields are required';
  const [credsAreInvalid, setCredsAreInvalid] = useState(false);
  const [streetColor, setStreetColor] = useState(false);
  const [cityColor, setCityColor] = useState(false);
  const [zipColor, setZipColor] = useState(false);
  const [stateColor, setStateColor] = useState(false);
  // ------------ HOUSE CREATION ------------
  const emptyHouse = {
    street: '',
    city: '',
    zip: '',
    state: '',
    formData: [],
  };
  const [userZpid, setUserZpid] = useState('');
  const [userHouse, setUserHouse] = useState(emptyHouse);
  const [clicked, setClicked] = useState(false);

  // ------------ RADIO INPUTS ------------
  const [formData, setFormData] = useState(emptyHouse);
  const [values, setValue] = useState(nationalAverages);
  const [radios, setRadios] = useState({
    kitchen: 0,
    roof: 0,
    door: 0,
    landscaping: 0,
    bathroom: 0,
    attic: 0,
    deck_patio_porch: 0,
  });
  // ------------ TOAST ------------
  const [openIt, setOpenIt] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (userZpid.zpid === undefined) {
      fetchHouse();
    }
  }, [userZpid]);

  const fetchHouse = async () => {
    const house = async () => await DB.getHouseByOwner(user.user.uid);
    const [userHouse] = await house();
    userHouse === undefined ? setUserZpid('') : setUserZpid(userHouse);
  };

  const handleOnClick = (event) => {
    const returnedTarget = Object.assign(radios);
    returnedTarget[event.target.name] = parseFloat(event.target.value);

    setRadios(returnedTarget);
  };

  const handleSubmitCalc = async (event) => {
    event.preventDefault();
    if (userZpid.zpid !== '') {
      setClicked(true);

      let totalValue = 0;
      for (const room in radios) {
        totalValue += radios[room];
      }
      let formData = [];
      for (const room in radios) {
        formData.push({ room: room, value: radios[room] });
      }
      formData.push({ RenovationValue: totalValue });

      const data = {
        zpid: userZpid.zpid,
        formData,
      };
      const house = async () => await DB.updateHouse(data);
      await house();
      
      setTimeout(() => {
        setClicked(false);
        props.history.push('/dashboard');
      }, 2000);
    }
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    setUserHouse({
      ...userHouse,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const inputHouseCreds = {
      city: userHouse.city,
      street: userHouse.street,
      zip: userHouse.zip,
      state: userHouse.state,
    };

    if (validateHouseInputs(inputHouseCreds)) {
      setClicked(true);
      setUserHouse(inputHouseCreds);
      await afterSubmit();
      setFormData(emptyHouse);
    } else {
      setCredsAreInvalid(errorMessage);
    }
  };

  const afterSubmit = async () => {
    // API returns inconsistent data structures,
    // house object might not include properties we are looking for
    // also the API just kinda sucks, 'new hampshire' doesnt work but 'nh' does
    // will need a way to deal with the following:
    // const alternateCentroid = autoCompleteResponse.data.autocomplete[1].centroid;
    // latitude: centroid === undefined ? alternateCentroid.lat : centroid.lat,
    // longitude: centroid === undefined ? alternateCentroid.lon : centroid.lon,
    
    let message;
    const params = {
      street: userHouse.street.toLowerCase(),
      city: userHouse.city.toLowerCase(),
      state: userHouse.state.toLowerCase(),
      zip: userHouse.zip.toLowerCase(),
    };
    const autoComplete = async () => await realtor.autoCompleteApi(params);
    const { data } = await autoComplete();
 
    if(!data.autocomplete[0].hasOwnProperty('mpr_id') || !data.hasOwnProperty('autocomplete') || data.autocomplete.length < 1){
      message = "Error: couldn't find house."
    }else{
      const {
        mpr_id,
        centroid,
        postal_code,
        state_code,
        city,
        line,
      } = data.autocomplete[0];

      setUserZpid(mpr_id);

      const houseParams = {
        zip: postal_code,
        state: state_code,
        city: city,
        street: line,
        hid: mpr_id,
        zpid: mpr_id,
        formData: [],
        latitude: 50,
        longitude: 50,
      };

      const createdHouse = async () => await DB.createHouse(user.user.uid, houseParams);
      const response = await createdHouse();
      message = response.message;
    }

    setToastMessage(message);
    setOpenIt(true);
    setOpenIt(false);
    setClicked(false);
  };

  const validateHouseInputs = ({ street, city, zip, state }) => {
    let isValid = true;

    if (!street) {
      setStreetColor(true);
      isValid = false;
    } else {
      setStreetColor(false);
    }

    if (!city) {
      setCityColor(true);
      isValid = false;
    } else {
      setCityColor(false);
    }

    if (!zip) {
      setZipColor(true);
      isValid = false;
    } else {
      setZipColor(false);
    }

    if (!state) {
      setStateColor(true);
      isValid = false;
    } else {
      setStateColor(false);
    }

    return isValid;
  };

  return !isAuth ? (
    <Redirect to='/login' />
  ) : (
    <Grid
      container
      justify='center'
      spacing={2}
      className={classes.alignContent}
    >
      {userZpid.zpid === undefined ? (
        <Grid item xs={12} s={10} m={8} l={6} xl={4} style={{ marginTop: '5%' }}>
          <AddHouse
            userHouse={userHouse}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            credsAreInvalid={credsAreInvalid}
            streetColor={streetColor}
            cityColor={cityColor}
            zipColor={zipColor}
            stateColor={stateColor}
            clicked={clicked}
          />
        </Grid>
      ) : (
        <Grid container item xs={12} style={{ marginTop: (biggerThanMobile ? '10%' : '20%') }}>
          <Grid item xs={12} md={6} style={{marginBottom: '20%'}}>
            <AddRenos
              handleOnClick={handleOnClick}
              handleSubmitCalc={handleSubmitCalc}
              values={values}
              clicked={clicked}
            />
          </Grid>
          <Grid item xs={12} md={6} style={{ marginBottom: '2em' }}>
           <FormChart data={userZpid} />
          </Grid>
        </Grid>
      )}
      <Toast openIt={openIt} message={toastMessage} />
    </Grid>
  );
});
