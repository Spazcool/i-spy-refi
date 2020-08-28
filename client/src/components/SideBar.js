import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom'
import { AuthProvider, AuthContext } from '../providers/AuthProvider';

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
import CodeIcon from '@material-ui/icons/Code';
import MoneyIcon from '@material-ui/icons/Money';
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

    const toggleDarkMode = () => {

    }

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
                <ListItemText primary={isAuth? (user.user.displayName ? user.user.displayName : user.user.email): ''} />
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem
                className={classes.link}
                key='dashboard'
                onClick={e => {
                  e.preventDefault();
                  props.history.push("/dashboard");
                }}
                button
              >
                <ListItemIcon><CodeIcon /></ListItemIcon>
                <ListItemText primary='Dashboard' />
              </ListItem>

              <ListItem
                className={classes.link}
                key='logout'
                onClick={e => {
                  e.preventDefault();

                }}
                button
              >
                <ListItemIcon><LightIcon /></ListItemIcon>
                <ListItemText primary='Dark Mode' />
              </ListItem>

              <ListItem
                className={classes.link}
                key='logout'
                onClick={e => {
                  e.preventDefault();
                  logout();
                }}
                button
              >
                <ListItemIcon><MoneyIcon /></ListItemIcon>
                <ListItemText primary='Logout' />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </>
    );
  }
)
