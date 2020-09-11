import React, { useState, useContext, useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

import { DB } from '../api/firestore';
import { AuthContext } from '../providers/AuthProvider';
import { HouseContext } from '../providers/HouseProvider';
import { realtor } from '../api/realtor';

import AddHouse from '../components/HouseAdditions/AddHouse';
import AddRenos from '../components/HouseAdditions/AddRenos';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

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
    description: 'Deck, paito or porch installation?',
  },
];

export default function HouseAdditions() {
  const classes = useStyles();
  const errorMessage = '* all fields are required';
  const [credsAreInvalid, setCredsAreInvalid] = useState(false)
  const [streetColor, setStreetColor] = useState(false)
  const [cityColor, setCityColor] = useState(false)
  const [zipColor, setZipColor] = useState(false)
  const [stateColor, setStateColor] = useState(false)
  const emptyHouse = {
    street: '',
    address: '',
    city: '',
    zip: '',
    state: '',
  };
  const { user, isAuth } = useContext(AuthContext);
  const [values, setValue] = useState(nationalAverages);
  const [userZpid, setUserZpid] = useState('');
  const [userHouse, setUserHouse] = useState(emptyHouse);
  const [formData, setFormData] = useState(emptyHouse)
  const [radios, setRadios] = useState({
    kitchen: 0,
    roof: 0,
    door: 0,
    landscaping: 0,
    bathroom: 0,
    attic: 0,
    deck_patio_porch: 0,
  });

  useEffect(() => {
    if(userZpid.zpid == undefined){
      fetchHouse();
    }
  }, [userZpid]);

  const fetchHouse = async () => {
    const house = async () => await DB.getHouseByOwner(user.user.uid);
    const [userHouse] = await house();
    userHouse === undefined ? setUserZpid('') : setUserZpid(userHouse);
    console.log(userHouse);
  };

  const handleOnClick = (event) => {
    const returnedTarget = Object.assign(radios);
    returnedTarget[event.target.name] = parseFloat(event.target.value);

    setRadios(returnedTarget);
  };

  const handleSubmitCalc = async (event) => {
    event.preventDefault();
    if (userZpid.zpid !== '') {
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
      const updatedHouse = await house();
      console.log(updatedHouse);
      //todo make this a toast, can grabe the message for the toast from this updatedHouse
      // toast reading updated house successfully
    }else{
      console.log('no house to add these too');
      // todo toast, sorry you aint got a house bro, go do that
    }
  };

  const handleInputChange = (event) => {
    console.log(event.target.value);
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
      await setUserHouse(inputHouseCreds);
      afterSubmit();
      setFormData(emptyHouse)
    } else {
      setCredsAreInvalid(errorMessage);
      console.log('bad inputs')
    }
  };

  const afterSubmit = async () => {
    const params = {
      street: userHouse.street.toLowerCase(),
      city: userHouse.city.toLowerCase(),
      state: userHouse.state.toLowerCase(),
      zip: userHouse.zip.toLowerCase(),
    };
    console.log(params);
    const autoComplete = async () => await realtor.autoCompleteApi(params);
    const autoCompleteResponse = await autoComplete();
    const { mpr_id, centroid, postal_code, state_code, city, line} = autoCompleteResponse.data.autocomplete[0];
    const alternateCentroid = autoCompleteResponse.data.autocomplete[1].centroid;
    console.log(mpr_id);

    setUserZpid(mpr_id);

    const data = {
      zip: postal_code,
      state: state_code,
      city: city,
      street: line,
      hid: mpr_id,
      zpid: mpr_id,
      latitude: centroid === undefined ? alternateCentroid.lat : centroid.lat,
      longitude: centroid === undefined ? alternateCentroid.lon : centroid.lon,
    };

    const createdHouse = async () => await DB.createHouse(user.user.uid, data);
    const response = await createdHouse();

    if (response.message === 'success') {
      console.log('house created');
      //todo add toast
    } else {
      //todo something broke
      console.log('you broke something:', response.message);
    }
  };

  const validateHouseInputs = ({ street, city, zip, state }) => {
    let isValid = true;

    if (!street) {
      setStreetColor(true)
      isValid = false;
    } else {
        setStreetColor(false)
    }

    if (!city) {
      setCityColor(true)
      isValid = false;
    } else {
      setCityColor(false)
    }

    if (!zip) {
      setZipColor(true)
      isValid = false;
    } else {
      setZipColor(false)
    }

    if (!state) {
      setStateColor(true)
      isValid = false;
    } else {
      setStateColor(false)
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
        <Grid item xs={12}>
          <AddHouse
            userHouse={userHouse}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            credsAreInvalid={credsAreInvalid}
            streetColor={streetColor}
            cityColor={cityColor}
            zipColor={zipColor}
            stateColor={stateColor}
          />
        </Grid>
      ) : (
        <Grid item xs={12}>
          <AddRenos
            handleOnClick={handleOnClick}
            handleSubmitCalc={handleSubmitCalc}
            values={values}
          />
        </Grid>
      )}
    </Grid>
  );
}
