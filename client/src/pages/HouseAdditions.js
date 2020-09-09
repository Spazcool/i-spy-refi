import React, { useState, useContext } from 'react';
import { zillow } from '../api/zillow.js'; // todo swap out this for Steffi's fix
import { DB } from '../api/firestore';
import { AuthContext } from '../providers/AuthProvider';
import { v4 as uuidv4 } from 'uuid';

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
  //jsut fo the commit
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
  const { user } = useContext(AuthContext);
  const classes = useStyles();
  const spacing = useState(2);
  const [values, setValue] = useState(nationalAverages);
  const [newValue, setNewValue] = useState([]);
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

  const handleOnClick = (event) => {
    const returnedTarget = Object.assign(radios);
    returnedTarget[event.target.name] = parseFloat(event.target.value);

    setRadios(returnedTarget);
  };

  const handleSubmitCalc = async (event) => {
    event.preventDefault();
    let totalValue = 0;
    for (const room in radios) {
      totalValue += radios[room];
    }
    let formData = [];
    for (const room in radios) {
      formData.push({ room: room, value: radios[room] });
    }
    formData.push(totalValue);

    const data = {
      zpid: '3972249581', //todo grab the zpid from someplace
      formData,
    };
    const house = async () => await DB.updateHouse(data);
    const updatedHouse = await house();
    console.log(updatedHouse); //todo make this a toast, can grabe the message for the toast from this updatedHouse
  };

  const handleInputChange = (event) => {
    console.log(event.target.value);
    event.preventDefault();
    setUserHouse({
      ...userHouse,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputHouseCreds = {
      city: userHouse.city,
      street: userHouse.street,
      zip: userHouse.zip,
      state: userHouse.state,
    };
    console.log(inputHouseCreds);
    setUserHouse(inputHouseCreds);
    afterSubmit();
  };

  const afterSubmit = () => {
    // const url = 'http:localhost:5000/GetSearchResults';
    const params = {
      street: userHouse.street.toLowerCase(),
      city: userHouse.city.toLowerCase(),
      state: userHouse.state.toLowerCase(),
      zip: userHouse.zip.toLowerCase(),
      // citystatezip: encodeURIComponent(
      //   userHouse.city,
      //   userHouse.state,
      //   userHouse.zip
      // ),
    };
    // zillow.getaddress(params).then((response) => {
    //   console.log(response);
    //   // console.log(response[0].address);
    //   // console.log(response[0].zpid);
    //   // let address = response[0].address;
    //   // let zpid = response[0].zpid;

    //   let houseData = {
    //     hid: uuidv4(),
    //     zpid: response[0].zpid,
    //     latitude: response[0].address.latitude,
    //     longitude: response[0].address.longitude,
    //     zip: response[0].address.zipcode,
    //     state: response[0].address.state,
    //     city: response[0].address.city,
    //     street: response[0].address.street,
    //     comps: '',
    //     formData: '',
    //     lastUpdated: '',
    //   };
    //   // console.log(houseData[0].address);
    //   // console.log(houseData[1].zpid);
    //   console.log(houseData);
    //   DB.createHouse(user.user.uid, houseData);
    // });
  };

  return (
    <Grid
      container
      justify='center'
      spacing={2}
      className={classes.alignContent}
    >
      <Grid item xs={12}>
        <AddHouse
          userHouse={userHouse}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </Grid>

      <Grid item xs={12}>
        <AddRenos
          handleOnClick={handleOnClick}
          handleSubmitCalc={handleSubmitCalc}
          values={values}
        />
      </Grid>
    </Grid>
  );
}
