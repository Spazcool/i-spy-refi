import React from 'react';
import { signInWithGoogle } from '../firebase';

import { FaGoogle } from 'react-icons/fa';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    // height: 140,
    // width: 100,
  },
  control: {
    'padding-left': theme.spacing(1),
  },
}));

const LoginGoogle = () => {
  const classes = useStyles();
  return (
    <Button
      onClick={() => signInWithGoogle()}
      variant='contained'
      color='primary'
      style={{'margin': '1em 0 0 0'}}
    >
      <span className='flip'>
        <FaGoogle />
      </span>
      <span className={classes.control}>Sign-In</span>
    </Button>
  );
};

export default LoginGoogle;
