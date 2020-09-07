import './App.css';
import React, { useContext } from 'react';
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';
import { AuthProvider, AuthContext } from './providers/AuthProvider';
import { CustomThemeProvider } from './providers/ThemeProvider';

import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import User from './pages/User';
import Splash from './pages/Splash';
import HouseAdditions from './pages/HouseAdditions';

import Navbar from './components/Navbar';

import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  const { isAuth } = useContext(AuthContext);
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
        <Navbar className="navbar" />
        <Switch>
          <Route exact path='/' render={(props) => <Splash {...props} />} />
          <Route exact path='/login' render={(props) => <Login {...props} />} />
          <Route exact path='/signup' render={() => <Signup />} />

          <PrivateRoute exact path='/additions' component={HouseAdditions} />
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
        <CssBaseline />
        <App />
      </CustomThemeProvider>
    </AuthProvider>
  );
};
