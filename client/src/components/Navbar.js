// TODO Delete
import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import SideBar from './SideBar.js';

import logo from '../assets/logo/nopersonalassess/white_logo_transparent_background.png';
import smallLogo from '../assets/logo/nopersonalassess/white_logo_transparent_background.png';
import { Grid, GridListTileBar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  login: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  thing: {
    width: '100%',
    display: 'flex',
    'flex-wrap': 'wrap',
  },
}));

export default withRouter(function Navbar(props) {
  const { isAuth } = useContext(AuthContext);
  const classes = useStyles();
  const biggerThanMobile = useMediaQuery('(min-width:600px)');

  return (
    <div className={classes.root}>
      {/* // todo position='static' for the previous style */}
      <AppBar position='fixed' className='navbar'>
        <Toolbar style={{ width: '100%' }}>
          <Grid container justify='space-between' className={classes.thing}>
            <Grid item>
              <SideBar props={props} />
            </Grid>
            <Grid item>
              {biggerThanMobile ? (
                <Link href='/'>
                  <img
                    src={logo}
                    alt='logo'
                    className='logo'
                    id='logo'
                    type='title'
                  />
                </Link>
              ) : (
                <Link href='/'>
                  <img
                    src={smallLogo}
                    alt='logo'
                    className='logo'
                    id='logo'
                    type='title'
                  />
                </Link>
              )}
            </Grid>
            <Grid item>
              <Typography variant='h6' className={classes.login}>
                {isAuth ? (
                  <></>
                ) : (
                  <>
                    <Button
                      className='m-1'
                      onClick={(e) => {
                        e.preventDefault();
                        props.history.push('/login');
                      }}
                    >
                      Login
                    </Button>

                    <Button
                      className='m-1'
                      onClick={(e) => {
                        e.preventDefault();
                        props.history.push('/signup');
                      }}
                    >
                      Signup
                    </Button>
                  </>
                )}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
});
