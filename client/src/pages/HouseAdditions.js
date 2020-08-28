import React, { useState, useEffect } from 'react';
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

// const handleSubmit = (event) => {
//   event.preventDefault();
//   const data = new FormData(event.target);
//   fetch(
//     `https://zillow-com.p/rapidapi.com/search/address?address=${event.target}`
//   );
// };
const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

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
  //   state = {
  //     kitchen: '',
  //     roof: '',
  //   };
  const classes = useStyles();
  const houseCreds = {
    street: '',
    city: '',
    zip: '',
    state: '',
  };
  const [currency, setCurrency] = useState('USD');
  const [userHouse, setUserHouse] = useState(houseCreds);

  const handleInputChange = (event) =>
    setUserHouse({
      // event.preventDefault();
      ...userHouse,
      [event.target.name]: event.target.value,
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    const inputHouseCreds = {
      city: encodeURIComponent(userHouse.city.trim()),
      street: encodeURIComponent(userHouse.street.trim()),
      zip: encodeURIComponent(userHouse.zip.trim()),
      state: encodeURIComponent(userHouse.state.trim()),
    };
    console.log(inputHouseCreds);
    setUserHouse(inputHouseCreds);
    afterSubmit();
  };

  const afterSubmit = () => {
    fetch(
      `https://zillow-com.p/rapidapi.com/search/address?address=${userHouse.street}%20&citystatezip=${userHouse.city}%20${userHouse.zip}%20${userHouse.state}`
    ).then((res) => console.log(res));
  };

  //   const city = event.target.city,

  //   const handleChange = (event) => {
  //     setCurrency(event.target.value);
  //   };

  //   const handleSetHouse = (event) => {
  //
  //   };

  useEffect(() => {
    // event.preventDefault();
  }, []);
  return (
    <form className={classes.root} noValidate autoComplete='on'>
      <FormGroup>
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
          />{' '}
          {/* <TextField
            required
            id='outlined-required'
            label='House Number'
            placeholder='House Number'
            variant='outlined'
          /> */}
          <TextField
            required
            id='outlined-required'
            label='Zip'
            placeholder='Zip'
            variant='outlined'
            name='zip'
            value={userHouse.zip}
            onChange={handleInputChange}
          />{' '}
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
                value='Counter Tops'
                control={<StyledRadio />}
                label='Counter Tops'
              />
              <FormControlLabel
                value='Oven'
                control={<StyledRadio />}
                label='Oven'
              />
              <FormControlLabel
                value='Counter Tops'
                control={<StyledRadio />}
                label='Counter Tops'
              />
              <FormControlLabel
                value='Dishwasher'
                control={<StyledRadio />}
                label='Dishwasher'
              />
              <FormControlLabel
                value='Cabinets'
                control={<StyledRadio />}
                label='Cabinets'
              />
              <FormControlLabel
                value='Wall Repairs'
                control={<StyledRadio />}
                label='Wall Repairs'
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
      </FormGroup>
    </form>
  );
}
