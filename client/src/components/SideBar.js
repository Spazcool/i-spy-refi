import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom'
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

import HomeIcon from '@material-ui/icons/Home';
import UserIcon from '@material-ui/icons/Person';
import ChartIcon from '@material-ui/icons/BarChart';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import LightIcon from '@material-ui/icons/WbSunnyOutlined';
import DarkIcon from '@material-ui/icons/WbSunnyRounded';

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
  }
});

export default withRouter(

  function TemporaryDrawer(props) {
    const { theme, toggleTheme } = useContext(CustomThemeContext);
    const { isAuth, logout, user } = useContext(AuthContext);
    const classes = useStyles();
    const [state, setState] = React.useState({
      left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

    return (
      <>
        <MenuIcon onClick={toggleDrawer('left', true)}/>
        <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
          <div
            className={clsx(classes.list, {
              [classes.fullList]: 'left' === 'top' || 'left' === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer('left', false)}
            onKeyDown={toggleDrawer('left', false)}
          >

            <List>
              <ListItem
                  className={classes.link}
                  key='home'
                  onClick={e => {
                    e.preventDefault();
                    props.history.push("/");
                  }}
                button
              >
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary='Home' />
              </ListItem>
              {isAuth? 
              <ListItem 
                button
                className={classes.link}
                key='me'
                onClick={e => {
                  e.preventDefault();
                  props.history.push("/user");
                }}
              >
                <ListItemIcon><UserIcon /></ListItemIcon>
                <ListItemText primary={user.user.displayName ? user.user.displayName : user.user.email} />
              </ListItem>
              : <></>}
            </List>
            <Divider />
            <List>
            {isAuth? 
              <ListItem
                className={classes.link}
                key='dashboard'
                onClick={e => {
                  e.preventDefault();
                  props.history.push("/dashboard");
                }}
                button
              >
                <ListItemIcon><ChartIcon /></ListItemIcon>
                <ListItemText primary='Dashboard' />
              </ListItem>
              : <></>}
              <ListItem
                className={classes.link}
                key='theme'
                onClick={e => {
                  e.preventDefault();
                  toggleTheme()
                }}
                button
              >
                <ListItemIcon>{theme ? <LightIcon /> : <DarkIcon/>}</ListItemIcon>
                <ListItemText>{theme ? 'Light' : 'Dark'}</ListItemText>
              </ListItem>
              
              { isAuth 
                ? 
                  <ListItem
                    className={classes.link}
                    key='logout'
                    onClick={e => {
                      e.preventDefault();
                      logout();
                    }}
                    button
                  >
                    <ListItemIcon><LogoutIcon /></ListItemIcon>
                    <ListItemText primary='Logout' />
                  </ListItem>
                :
                  <></>
              }
            </List>
          </div>
        </Drawer>
      </>
    );
  }
)
