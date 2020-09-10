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
  const { user, isAuth } = useContext(AuthContext);
  const classes = useStyles();
  const [values, setValue] = useState(nationalAverages);
  const [userZpid, setUserZpid] = useState('');
  const [userHouse, setUserHouse] = useState({
    street: '',
    address: '',
    city: '',
    zip: '',
    state: '',
  });
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
    fetchHouse();
  }, []);

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
    if (userZpid !== '') {
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
    }
    console.log('no house to add these too');
    // todo toast, sorry you aint got a house bro, go do that
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
    console.log(inputHouseCreds);
    await setUserHouse(inputHouseCreds);
    afterSubmit();
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
    const { mpr_id, centroid } = autoCompleteResponse.data.autocomplete[0];

    console.log(mpr_id);

    setUserZpid(mpr_id);

    const data = {
      zip: autoCompleteResponse.data.autocomplete[0].postal_code,
      state: autoCompleteResponse.data.autocomplete[0].state_code,
      city: autoCompleteResponse.data.autocomplete[0].city,
      street: autoCompleteResponse.data.autocomplete[0].line,
      // comps,
      // formData,
      // lastUpdated,
      hid: mpr_id,
      // hid: user.user.uid
      zpid: mpr_id,
      latitude: centroid.lat,
      longitude: centroid.lon,
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

  return !isAuth ? (
    <Redirect to='/login' />
  ) : (
    <Grid
      container
      justify='center'
      spacing={2}
      className={classes.alignContent}
    >
      {userHouse.hid !== undefined ? (
        <Grid item xs={12}>
          <AddHouse
            userHouse={userHouse}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
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
