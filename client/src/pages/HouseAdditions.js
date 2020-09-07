import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom'
import { zillow } from '../api/zillow.js';
import { DB } from '../api/firestore';
import { AuthContext } from '../providers/AuthProvider';
import { v4 as uuidv4 } from 'uuid';

import { makeStyles, Container } from '@material-ui/core';
import clsx from 'clsx';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '50%',
      justifyContent: 'center',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  label: {
    color: 'rgba(255, 255, 255, 0.7)',
    padding: '0',
    fontSize: ' 1rem',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontWeight: '400',
    lineHeight: '1',
    letterSpacing: '0.00938em',
    textAlign: 'center',
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow:
      'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage:
      'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
  group: {
    width: 'auto',
    height: 'auto',
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    alignSelf: 'center',
    width: '25%',
  },
  MuiTypography: {
    variantMapping: {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
    },
  },
}));

function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.group}
      disableRipple
      color='default'
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export default function HouseAdditions() {
  const { user, isAuth } = useContext(AuthContext);
  const classes = useStyles();
  const houseCreds = {
    address: '',
    city: '',
    zip: '',
    state: '',
  };

  let nationalAverages = [
    {
      id: 0,
      name: 'Minor Kitchen Remodel',
      value: '14600',
    },
    {
      id: 1,
      name: 'Major Kitchen Remodel',
      value: '39900',
    },
    {
      id: 2,
      name: 'Asphalt Shingles',
      value: '12777',
    },
    {
      id: 3,
      name: 'Metal Roof',
      value: '21731',
    },
    {
      id: 4,
      name: 'Minor Bathroom Remodel',
      value: '10700',
    },
    {
      id: 5,
      name: 'Major Bathroom Remodel',
      value: '24300',
    },
    {
      id: 6,
      name: 'Attic Bedroom Conversion',
      value: '36700',
      notUpdated: 'Attic Bedroom Conversion: No',
      notUpdatedValue: '0',
    },
    {
      id: 7,
      name: 'Landscaping',
      value: '4900',
      notUpdated: 'Landscaping: No',
      notUpdatedValue: '0',
    },
    {
      id: 8,
      name: 'Entry Door Replacement',
      value: '1280',
      notUpdated: 'Entry Door Replacement: No',
      notUpdatedValue: '0',
    },
    {
      id: 9,
      name: 'Deck/Patio/Porch',
      value: '10000',
      notUpdated: 'Deck/Patio/Porch: No',
      notUpdatedValue: '0',
    },
  ];

  const [userHouse, setUserHouse] = useState(houseCreds);
  const [value, setValue] = useState(nationalAverages);
  const [newValue, setNewValue] = useState([]);
  const [userZpid, setUserZpid] = useState('');
  // const [selected, setSelected] = useState({});

  useEffect(() => {
    async function fetchZpid() {
      const house = async () => await DB.getHouseByOwner(user.user.uid);
      const [userHouse] = await house();
      setUserZpid(userHouse.zpid);
    }
    fetchZpid();
  }, [userHouse]);
  // const handleOnChange = (event) => {
  //   setSelected({
  //     ...selected,
  //     [event.target.name]: event.target.value,
  //   });
  //   console.log(event.target.value);
  //   setSelected(selected);
  //   console.log(selected);
  // };

  const handleOnClick = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);

    newValue.push({
      hasUpdated: event.target.name,
      value: parseFloat(event.target.value),
    });

    let filteredValue = [...new Set(newValue.map(JSON.stringify))].map(
      JSON.parse
    );
    setNewValue(filteredValue);
    console.log(filteredValue);
  };

  const handleSubmitCalc = async (event) => {
    event.preventDefault();

    let theSum = 0;
    for (let i = 0, numb = newValue.length; i < numb; i++) {
      theSum += newValue[i].value;
    }
    newValue.push({ renovationValue: theSum });
    console.log(theSum);
    setNewValue(theSum);

    // console.log(value);
    console.log(newValue);

    const data = {
      zpid: userZpid,
      formData: newValue,
    };

    const house = async () => await DB.updateHouse(data);
    const updatedHouse = await house().then((res) => {
      console.log(res);
    });

    // DB.updateHouse(updatedHouse);
  };

  const handleInputChange = (event) => {
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
    zillow.getaddress(params).then((response) => {
      console.log(response);
      // console.log(response[0].address);
      // console.log(response[0].zpid);
      // let address = response[0].address;
      // let zpid = response[0].zpid;

      let houseData = {
        hid: uuidv4(),
        zpid: response[0].zpid,
        latitude: response[0].address.latitude,
        longitude: response[0].address.longitude,
        zip: response[0].address.zipcode,
        state: response[0].address.state,
        city: response[0].address.city,
        street: response[0].address.street,
        comps: '',
        formData: '',
        lastUpdated: '',
      };
      // console.log(houseData[0].address);
      // console.log(houseData[1].zpid);
      console.log(houseData);
      DB.createHouse(user.user.uid, houseData);
      // handleSubmitCalc(houseData);
      console.log(houseData.zpid);
      setUserZpid(houseData.zpid);
    });
  };

  return (
    !isAuth ? 
      <Redirect to='/login' />
    :
    <div
      className={(classes.root, classes.group)}
      noValidate
      autoComplete='off'
      style={{
        minWidth: 500,
        maxHeight: 500,

        flexWrap: 'wrap',
      }}
    >
      <Typography variant='h2'>Find Your House:</Typography>
      <Container>
        <FormGroup id='initInput'>
          <FormLabel style={{ alignSelf: 'center' }}>
            <TextField
              required
              label='Street'
              placeholder='Street'
              variant='outlined'
              name='street'
              value={userHouse.street}
              onChange={handleInputChange}
            />
            <TextField
              required
              label='City'
              placeholder='City'
              variant='outlined'
              name='city'
              value={userHouse.city}
              onChange={handleInputChange}
            />
            <TextField
              required
              label='Zip'
              placeholder='Zip'
              variant='outlined'
              name='zip'
              value={userHouse.zip}
              onChange={handleInputChange}
            />
            <TextField
              required
              label='State'
              placeholder='State'
              variant='outlined'
              name='state'
              value={userHouse.state}
              onChange={handleInputChange}
            />
            <br />

            <FormGroup>
              <FormControl component='fieldset'>
                <FormLabel component='legend'>Kitchen Renovations:</FormLabel>
                <br />
                <RadioGroup
                  className={classes.group}
                  aria-label='renovations'
                  name='customized-radios'
                >
                  <FormControlLabel
                    value='Yes'
                    control={<StyledRadio />}
                    label='Yes'
                  />
                  <FormControlLabel
                    value='No'
                    control={<StyledRadio />}
                    label='No'
                  />
                </RadioGroup>
              </FormControl>
              <br />
              <FormControl component='fieldset'>
                <FormLabel component='legend'>What have you renovated?</FormLabel>
                <br />
                <RadioGroup
                  className={classes.group}
                  aria-label='renovations'
                  name='customized-radios'
                >
                  <FormControlLabel
                    onClick={handleOnClick}
                    value={value[0].value}
                    control={<StyledRadio />}
                    label={value[0].name}
                  />
                  <FormControlLabel
                    onClick={handleOnClick}
                    value={value[1].value}
                    control={<StyledRadio />}
                    label={value[1].name}
                  />
                </RadioGroup>
              </FormControl>
              <br />
              <FormControl component='fieldset'>
                <FormLabel component='legend'>Roof Renovations:</FormLabel>
                <br />
                <RadioGroup
                  className={classes.group}
                  defaultValue='no'
                  aria-label='renovations'
                  name='customized-radios'
                >
                  <FormControlLabel
                    value='Yes'
                    control={<StyledRadio />}
                    label='Yes'
                  />
                  <FormControlLabel
                    value='No'
                    control={<StyledRadio />}
                    label='No'
                  />
                </RadioGroup>
              </FormControl>
              <br />
              <FormControl component='fieldset'>
                <FormLabel component='legend'>Pick your Roof Style: </FormLabel>
                <br />
                <RadioGroup
                  className={classes.group}
                  aria-label='renovations'
                  name='customized-radios'
                >
                  <FormControlLabel
                    onClick={handleOnClick}
                    value={value[2].value}
                    control={<StyledRadio />}
                    label={value[2].name}
                  />
                  <FormControlLabel
                    onClick={handleOnClick}
                    value={value[3].value}
                    control={<StyledRadio />}
                    label={value[3].name}
                  />
                </RadioGroup>
              </FormControl>
            </FormGroup>
            <br />
            <FormControl component='fieldset'>
              <FormLabel component='legend' className={classes.label}>
                Kitchen Renovations:{' '}
              </FormLabel>
              <br />
              <RadioGroup
                className={classes.group}
                defaultValue='no'
                aria-label='renovations'
                name='customized-radios'
                // onChange={handleOnChange}
              >
                <FormControlLabel
                  onClick={handleOnClick}
                  value={value[7].value}
                  control={<StyledRadio />}
                  label={value[0].name}
                  name={value[0].name}
                />
                <FormControlLabel
                  onClick={handleOnClick}
                  value='No'
                  control={<StyledRadio />}
                  label={value[1].name}
                  name={value[1].name}
                />
              </RadioGroup>
            </FormControl>
            <br />

            <FormControl component='fieldset'>
              <FormLabel component='legend' className={classes.label}>
                Roof Renovations:{' '}
              </FormLabel>
              <br />
              <RadioGroup
                className={classes.group}
                defaultValue='no'
                aria-label='renovations'
                name='customized-radios'
              >
                <FormControlLabel
                  onClick={handleOnClick}
                  value={value[9].value}
                  control={<StyledRadio />}
                  label={value[2].name}
                  name={value[2].name}
                />
                <FormControlLabel
                  onClick={handleOnClick}
                  value='No'
                  control={<StyledRadio />}
                  label={value[3].name}
                  name={value[3].name}
                />
              </RadioGroup>
            </FormControl>
          </FormGroup>
          <br />
          <FormControl component='fieldset'>
            <FormLabel component='legend' className={classes.label}>
              Bathroom Remodel:
            </FormLabel>
            <br />
            <RadioGroup
              className={classes.group}
              defaultValue='no'
              aria-label='renovations'
              name='customized-radios'
            >
              <FormControlLabel
                onClick={handleOnClick}
                value={value[4].value}
                control={<StyledRadio />}
                label={value[4].name}
                name={value[4].name}
              />
              <FormControlLabel
                onClick={handleOnClick}
                value={value[5].value}
                control={<StyledRadio />}
                label={value[5].name}
                name={value[5].name}
              />
            </RadioGroup>
          </FormControl>
          <br />
          <FormControl component='fieldset'>
            <FormLabel component='legend' className={classes.label}>
              Attic Bedroom Conversion:
            </FormLabel>
            <br />
            <RadioGroup
              className={classes.group}
              defaultValue='no'
              aria-label='renovations'
              name='customized-radios'
            >
              <FormControlLabel
                onClick={handleOnClick}
                value={value[6].value}
                control={<StyledRadio />}
                label='Yes'
                name={value[6].name}
              />
              <FormControlLabel
                onClick={handleOnClick}
                control={<StyledRadio />}
                label='No'
                name={value[6].notUpdated}
                value={value[6].notUpdatedValue}
              />
            </RadioGroup>
          </FormControl>
          <br />
          <FormControl component='fieldset'>
            <FormLabel component='legend' className={classes.label}>
              Landscaping:
            </FormLabel>
            <br />
            <RadioGroup
              className={classes.group}
              defaultValue='no'
              aria-label='renovations'
              name='customized-radios'
            >
              <FormControlLabel
                onClick={handleOnClick}
                value={value[7].value}
                control={<StyledRadio />}
                label='Yes'
                name={value[7].name}
              />
              <FormControlLabel
                onClick={handleOnClick}
                control={<StyledRadio />}
                label='No'
                name={value[7].notUpdated}
                value={value[7].notUpdatedValue}
              />
            </RadioGroup>
          </FormControl>
          <br />
          <FormControl component='fieldset'>
            <FormLabel component='legend' className={classes.label}>
              Entry Door Replacement:
            </FormLabel>
            <br />
            <RadioGroup
              className={classes.group}
              defaultValue='no'
              aria-label='renovations'
              name='customized-radios'
            >
              <FormControlLabel
                onClick={handleOnClick}
                value={value[8].value}
                control={<StyledRadio />}
                label='Yes'
                name={value[8].name}
              />
              <FormControlLabel
                onClick={handleOnClick}
                value={value[8].notUpdatedValue}
                control={<StyledRadio />}
                label='No'
                name={value[8].notUpdated}
              />
            </RadioGroup>
          </FormControl>
          <br />
          <FormControl component='fieldset'>
            <FormLabel component='legend' className={classes.label}>
              Deck/Patio/Porch Addition:
            </FormLabel>
            <br />
            <RadioGroup
              className={classes.group}
              defaultValue='no'
              aria-label='renovations'
              name='customized-radios'
            >
              <FormControlLabel
                onClick={handleOnClick}
                value={value[9].value}
                control={<StyledRadio />}
                label='Yes'
                name={value[9].name}
              />
              <FormControlLabel
                onClick={handleOnClick}
                value={value[9].notUpdatedValue}
                control={<StyledRadio />}
                label='No'
                name={value[9].notUpdated}
              />
            </RadioGroup>
          </FormControl>
          <br />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            onClick={handleSubmitCalc}
            className={classes.button}
          >
            Calculate
          </Button>
        </FormGroup>
      </Container>
    </div>
  );
}
