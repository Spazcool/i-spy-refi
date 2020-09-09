import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import FormLabel from '@material-ui/core/FormLabel';

import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import { makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';

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
  alignContent: {
    display: 'flex',
    textAlign: 'center',
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
      color='default'
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export default function AddRenos(props) {
  const [isMounted, setIsMounted] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setIsMounted(true);
    }
    return () => (mounted = false);
  }, [isMounted]);

  const listRadios = () => {
    // console.log(props);
    return props.values.map((room, i) => {
      return (
        <Grid item xs={12} s={8} m={6} l={4} key={room.id + i}>
          <FormLabel component='legend'>{room.description}</FormLabel>
          <FormControl component='fieldset'>
            <RadioGroup
              className={classes.group}
              aria-label='Check Your Renovations'
              name={room.id}
            >
              <FormControlLabel
                onClick={props.handleOnClick}
                value={room.minor.value}
                control={<StyledRadio />}
                label={room.minor.type}
              />
              <FormControlLabel
                onClick={props.handleOnClick}
                value={room.major.value}
                control={<StyledRadio />}
                label={room.major.type}
              />

              {room.noSelection !== undefined ? (
                <FormControlLabel
                  onClick={props.handleOnClick}
                  value={room.noSelection.value}
                  control={<StyledRadio />}
                  label={room.noSelection.type}
                />
              ) : (
                ''
              )}
            </RadioGroup>
          </FormControl>
        </Grid>
      );
    });
  };
  return (
    <Box display='flex'>
      <Box m='auto'>
        <br />
        <Grid
          container
          justify='center'
          spacing={2}
          className={classes.alignContent}
        >
          <Typography variant='h3'>Renovations:</Typography>
          <br />
          {isMounted ? listRadios() : ''}
          <Button
            type='submit'
            variant='contained'
            color='primary'
            onClick={props.handleSubmitCalc}
            className={classes.button}
          >
            Calculate
          </Button>
        </Grid>
      </Box>
    </Box>
  );
}
