import React from 'react';
import Box from '@material-ui/core/Box';
// import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '50vw',
      justifyContent: 'center',
    },
  },
  button: {
    padding: '1em',
    width: '25%',
    'background-color': '#437779',
  },
}));

export default function AddHouse(props) {
  const classes = useStyles();
  return (
    <Box display='flex'>
      <Box m='auto'>
        <h1 className='mt-5'>Add Your House to Get Started</h1>
        <FormGroup id='initInput' className={classes.root}>
          <TextField
            required
            label='Street'
            placeholder='Street'
            variant='outlined'
            name='street'
            value={props.userHouse.street}
            onChange={props.handleInputChange}
          />
          <TextField
            required
            label='City'
            placeholder='City'
            variant='outlined'
            name='city'
            value={props.userHouse.city}
            onChange={props.handleInputChange}
          />

          <TextField
            required
            label='Zip'
            placeholder='Zip'
            variant='outlined'
            name='zip'
            value={props.userHouse.zip}
            onChange={props.handleInputChange}
          />
          <TextField
            required
            label='State'
            placeholder='State'
            variant='outlined'
            name='state'
            value={props.userHouse.state}
            onChange={props.handleInputChange}
          />
        </FormGroup>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          onClick={props.handleSubmit}
          className={classes.button}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
