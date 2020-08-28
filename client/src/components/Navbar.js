import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SideBar from './SideBar.js';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default withRouter(
  function Navbar(props) {
    const { isAuth } = useContext(AuthContext);
    const classes = useStyles();

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <SideBar props={props}/>
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              I Spy Refi
            </Typography>

            {isAuth ?
              <></>
              : <>
                <Button
                  className="m-1"
                  onClick={e => {
                    e.preventDefault();
                    props.history.push("/login");
                  }}
                >
                  Login
                </Button>
                <Button
                  className="m-1"
                  onClick={e => {
                    e.preventDefault();
                    props.history.push("/signup");
                  }}
                >
                  Signup
                </Button>
              </>
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
)