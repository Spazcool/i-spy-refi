import './App.css';
import React, { useContext, useEffect, useState } from 'react';
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';
import { AuthProvider, AuthContext } from './providers/AuthProvider';
import { CustomThemeProvider, CustomThemeContext } from './providers/ThemeProvider';

import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import User from './pages/User';
import Splash from './pages/Splash';

import Navbar from './components/Navbar';
import HouseDisplay from './components/HouseDisplay';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

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

function App() {
  const classes = useStyles();
  const { theme } = useContext(CustomThemeContext);
  const { isAuth, user } = useContext(AuthContext);
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );

  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' render={(props) => <Splash {...props} />} />
          <Route exact path='/login' render={(props) => <Login {...props} />} />
          <Route exact path='/signup' render={(props) => <Signup {...props} />} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/user' component={User} />
        </Switch>
      </>
    </Router>
  );
}

export default () => {

  return (
    <AuthProvider>
      <CustomThemeProvider>
      <CssBaseline/>

        <App />
      </CustomThemeProvider>
    </AuthProvider>
  );
};
