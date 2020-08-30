import React, { setState, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';
import { Form } from 'react-bootstrap';
import { Zillow } from '../api/zillow.js';
// import { AuthContext } from '../providers/HouseProvider';
// import { Redirect } from 'react-router-dom';

// const handleSubmit = (event) => {
//   event.preventDefault();
//   const data = new FormData(event.target);
//   fetch(
//     `https://zillow-com.p/rapidapi.com/search/address?address=${event.target}`
//   );
// };

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '50%',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
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
  const classes = useStyles();
  const houseCreds = {
    street: '',
    city: '',
    zip: '',
    state: '',
  };

  const [userHouse, setUserHouse] = useState(houseCreds);

  const handleInputChange = (event) =>
    setUserHouse({
      ...userHouse,
      [event.target.name]: event.target.value.trim(),
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputHouseCreds = {
      city: encodeURIComponent(userHouse.city),
      street: encodeURIComponent(userHouse.street),
      zip: encodeURIComponent(userHouse.zip),
      state: encodeURIComponent(userHouse.state),
    };
    console.log(inputHouseCreds);
    setUserHouse(inputHouseCreds);
    afterSubmit();
  };

  const afterSubmit = () => {
    const url = 'http:localhost:5000/GetSearchResults';
    const params = {
      address: encodeURIComponent(userHouse.street),
      citystatezip: encodeURIComponent(
        userHouse.city,
        userHouse.state,
        userHouse.zip
      ),
      rentzestimate: false,
    };
    Zillow.getZillow(url, params);
    // fetch(
    //   `https://zillow-com.p/rapidapi.com/search/address?address=${userHouse.street}%20Street&citystatezip=${userHouse.city}%20${userHouse.state}%20${userHouse.zip}`,
    //   {
    //     method: 'GET',
    //     headers: {
    //       'x-rapidapi-host': 'zillow-com.p.rapidapi.com',
    //       'x-rapidapi-key':
    //         '26d05b2092msh8d14d2474ce38e0p120b64jsn0baeb38641f3',
    //     },
    //   }
    // ).then((res) => console.log(res));
  };

  // const { isInput } = useContext(AuthContext);

  //   const city = event.target.city,

  //   const handleChange = (event) => {
  //     setCurrency(event.target.value);
  //   };

  //   const handleSetHouse = (event) => {
  //
  //   };

  // useEffect(() => {
  //   // event.preventDefault();
  // }, []);

  return (
    <div
      className={(classes.root, classes.group)}
      noValidate
      autoComplete='on'
      style={{
        minWidth: 500,
        maxHeight: 500,
        overflow: 'auto',
        flexWrap: 'wrap',
      }}
    >
      <FormGroup id='initInput'>
        <FormLabel>
          <TextField
            required
            id='outlined-required'
            label='Street'
            placeholder='Street'
            variant='outlined'
            name='street'
            value={userHouse.street}
            onChange={handleInputChange}
          />
          <TextField
            required
            id='outlined-required'
            label='City'
            placeholder='City'
            variant='outlined'
            name='city'
            value={userHouse.city}
            onChange={handleInputChange}
          />
          <TextField
            required
            id='outlined-required'
            label='Zip'
            placeholder='Zip'
            variant='outlined'
            name='zip'
            value={userHouse.zip}
            onChange={handleInputChange}
          />
          <TextField
            required
            id='outlined-required'
            label='State'
            placeholder='State'
            variant='outlined'
            name='state'
            value={userHouse.state}
            onChange={handleInputChange}
          />
          <br />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </FormLabel>
        <FormGroup />

        <br />

        <FormGroup>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Kitchen Renovations:</FormLabel>
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
            <FormLabel component='legend'>What have you renovated?</FormLabel>
            <br />
            <RadioGroup
              className={classes.group}
              aria-label='renovations'
              name='customized-radios'
            >
              <FormControlLabel
                value='Minor Kitchen Remodel'
                control={<StyledRadio />}
                label='Minor Kitchen Remodel'
              />
              <FormControlLabel
                value='Major Kitchen Remodel'
                control={<StyledRadio />}
                label='Major Kitchen Remodel'
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
                value='Asphalt Shingles'
                control={<StyledRadio />}
                label='Asphalt Shingles'
              />
              <FormControlLabel
                value='Metal'
                control={<StyledRadio />}
                label='Metal'
              />
            </RadioGroup>
          </FormControl>
        </FormGroup>
        <br />
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Bathroom Remodel:</FormLabel>
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
            <FormControlLabel value='No' control={<StyledRadio />} label='No' />
          </RadioGroup>
        </FormControl>
        <br />
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Landscaping:</FormLabel>
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
            <FormControlLabel value='No' control={<StyledRadio />} label='No' />
          </RadioGroup>
        </FormControl>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Entry Door Replacement:</FormLabel>
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
            <FormControlLabel value='No' control={<StyledRadio />} label='No' />
          </RadioGroup>
        </FormControl>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Deck/Patio/Porch Addition :</FormLabel>
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
            <FormControlLabel value='No' control={<StyledRadio />} label='No' />
          </RadioGroup>
        </FormControl>
      </FormGroup>
    </div>
  );
}
