import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { CustomThemeContext } from '../providers/ThemeProvider';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';

import HomeIcon from '@material-ui/icons/Home';
import UserIcon from '@material-ui/icons/Person';
import ChartIcon from '@material-ui/icons/BarChart';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import LightIcon from '@material-ui/icons/WbSunnyOutlined';
import DarkIcon from '@material-ui/icons/WbSunnyRounded';
import '../App.css';

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
});

// export default withRouter(
export default function TemporaryDrawer(props) {
  const { theme, toggleTheme } = useContext(CustomThemeContext);
  const { isAuth, logout, user } = useContext(AuthContext);
  const classes = useStyles();
  const [state, setState] = React.useState({
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
            <ListItem
              className={classes.link}
              key='home'
              onClick={(e) => {
                e.preventDefault();
                props.history.push('/');
              }}
              button
            >
              <ListItemIcon>
                <span className='flip'>
                  <HomeIcon />
                </span>
              </ListItemIcon>
              <ListItemText primary='Home' />
            </ListItem>
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
                <ListItemText
                  primary={
                    user.user.displayName
                      ? user.user.displayName
                      : user.user.email
                  }
                />
              </ListItem>
            ) : (
              <></>
            )}
          </List>
          <Divider />
          <List>
            {isAuth ? (
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
            ) : (
              <></>
            )}
            {isAuth ? (
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
                    <HomeIcon />
                  </span>
                </ListItemIcon>
                <ListItemText primary='House Additions' />
              </ListItem>
            ) : (
              <></>
            )}

            <ListItem
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
            </ListItem>

            {isAuth ? (
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
            )}
          </List>
        </div>
      </Drawer>
    </>
  );
}
