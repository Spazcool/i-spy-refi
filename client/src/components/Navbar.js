// TODO Delete
import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SideBar from './SideBar.js';

import logo from '../assets/logo/white_logo_transparent_background.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default withRouter(function Navbar(props) {
  const { isAuth } = useContext(AuthContext);
  const classes = useStyles();
  // const [open, setOpen] = useState(false);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  return (
    <div className={classes.root}>
      <AppBar position='static' className='navbar'>
        <Toolbar>
          <SideBar props={props} />
          <img src={logo} alt='logo' className='logo' />
          <Typography variant='h6' className='brand'></Typography>

          {isAuth ? (
            <></>
          ) : (
            <>
              <Button
                className='m-1'
                onClick={(e) => {
                  // handleOpen()
                  e.preventDefault();
                  props.history.push('/login');
                }}
              >
                {/* <SignInUpModal open={open} setOpen={setOpen}/> */}
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
        </Toolbar>
      </AppBar>
    </div>
  );
});
