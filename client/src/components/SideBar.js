import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { CustomThemeContext } from '../providers/ThemeProvider';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Link from '@material-ui/core/Link';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import UserIcon from '@material-ui/icons/Person';
import ChartIcon from '@material-ui/icons/BarChart';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import SignUpIcon from '@material-ui/icons/ControlPoint';
import LightIcon from '@material-ui/icons/WbSunnyOutlined';
import DarkIcon from '@material-ui/icons/WbSunnyRounded';
import { FaTools } from 'react-icons/fa';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  rotated: {
    '-webkit-transform':'rotate(180deg)',
    '-moz-transform': 'rotate(180deg)',
    '-ms-transform': 'rotate(180deg)',
    '-o-transform': 'rotate(180deg)',
    'transform': 'rotate(180deg)',
  }
});

export default withRouter(function TemporaryDrawer(props) {
  // const { theme, toggleTheme } = useContext(CustomThemeContext);
  const { isAuth, logout, user } = useContext(AuthContext);
  const classes = useStyles();
  const [displayName, setDisplayName] = useState('');
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const selectDisplayName = () => {
    let name;
    if (user.user.displayName) {
      name = user.user.displayName;
    } else {
      name = user.user.email; //ideally take from firstname&lastname from db
    }
    setDisplayName(name);
  };

  useEffect(() => {
    if (isAuth) {
      selectDisplayName();
    }
  }, [isAuth]);

  return (
    <>
      <IconButton
        edge='start'
        className={classes.menuButton}
        color='inherit'
        aria-label='menu'
        onClick={toggleDrawer('left', true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor={'left'}
        open={state['left']}
        onClose={toggleDrawer('left', false)}
      >
        <div
          className={clsx(classes.list, {
            [classes.fullList]: 'left' === 'top' || 'left' === 'bottom',
          })}
          role='presentation'
          onClick={toggleDrawer('left', false)}
          onKeyDown={toggleDrawer('left', false)}
        >
          <List>
            <Link href='/' style={{'text-decoration': 'none'}}>
              <ListItem
                className={classes.link}
                key='home'
              >
                <ListItemIcon>
                  <span className='flip'>
                    <HomeIcon />
                  </span>
                </ListItemIcon>
                <ListItemText primary='Home' />
              </ListItem>
            </Link>
            {isAuth ? (
              <ListItem
                button
                className={classes.link}
                key='me'
                onClick={(e) => {
                  e.preventDefault();
                  props.history.push('/user');
                }}
              >
                <ListItemIcon>
                  <span className='flip'>
                    <UserIcon />
                  </span>
                </ListItemIcon>
                <ListItemText primary={displayName} />
              </ListItem>
            ) : (
              <></>
            )}
          </List>
          <Divider />
          <List>
            {isAuth ? (
              <>
                <ListItem
                  className={classes.link}
                  key='dashboard'
                  onClick={(e) => {
                    e.preventDefault();
                    props.history.push('/dashboard');
                  }}
                  button
                >
                  <ListItemIcon>
                    <span className='flip'>
                      <ChartIcon />
                    </span>
                  </ListItemIcon>
                  <ListItemText primary='Dashboard' />
                </ListItem>
              
                <ListItem
                  className={classes.link}
                  key='House Additions'
                  onClick={(e) => {
                    e.preventDefault();
                    props.history.push('/additions');
                  }}
                  button
                >
                  <ListItemIcon>
                    <span className='flip'>
                      <FaTools />
                    </span>
                  </ListItemIcon>
                  <ListItemText primary='House Additions' />
                </ListItem>

                <ListItem
                  className={classes.link}
                  key='logout'
                  onClick={(e) => {
                    e.preventDefault();
                    logout();
                  }}
                  button
                >
                  <ListItemIcon>
                    <span className='flip'>
                      <LogoutIcon className={classes.rotated}/>
                    </span>
                  </ListItemIcon>
                  <ListItemText primary='Logout' />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem
                  className={classes.link}
                  key='Login'
                  onClick={(e) => {
                    e.preventDefault();
                    props.history.push('/login');
                  }}
                  button
                >
                  <ListItemIcon>
                    <span className='flip'>
                      <LogoutIcon />
                    </span>
                  </ListItemIcon>
                  <ListItemText primary='Login' />
                </ListItem>

                <ListItem
                  className={classes.link}
                  key='Sign Up'
                  onClick={(e) => {
                    e.preventDefault();
                    props.history.push('/signup');
                  }}
                  button
                >
                  <ListItemIcon>
                    <span className='flip'>
                      <SignUpIcon />
                    </span>
                  </ListItemIcon>
                  <ListItemText primary='Sign Up' />
                </ListItem>
              </>
            )}

            {/* <ListItem
              className={classes.link}
              key='theme'
              onClick={(e) => {
                e.preventDefault();
                toggleTheme();
              }}
              button
            >
              <ListItemIcon>
                <span className='flip'>
                  {theme ? <LightIcon /> : <DarkIcon />}
                </span>
              </ListItemIcon>
              <ListItemText>{theme ? 'Light' : 'Dark'}</ListItemText>
            </ListItem> */}

            {/* {isAuth ? (
              <ListItem
                className={classes.link}
                key='logout'
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
                button
              >
                <ListItemIcon>
                  <span className='flip'>
                    <LogoutIcon />
                  </span>
                </ListItemIcon>
                <ListItemText primary='Logout' />
              </ListItem>
            ) : (
              <></>
            )} */}
          </List>
        </div>
      </Drawer>
    </>
  );
});
