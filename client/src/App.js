import './App.css';
import React, { useContext, useRef, useEffect } from 'react';
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';

import { AuthProvider, AuthContext } from './providers/AuthProvider';
import { CustomThemeProvider } from './providers/ThemeProvider'; //TODO DELETE

import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
// Layouts
import LayoutDefault from './layouts/LayoutDefault';
// Views
import Home from './views/Home';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import User from './pages/User';
import HouseAdditions from './pages/HouseAdditions';

import Navbar from './components/Navbar';
import CssBaseline from '@material-ui/core/CssBaseline';

const App = () => {
  const { isAuth } = useContext(AuthContext);
  const childRef = useRef();

  useEffect(() => {
    document.body.classList.add('is-loaded');
    childRef.current.init();
  }, []);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );

  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <Router>
          <Navbar className='navbar' />
          <>
            <LayoutDefault>
              <Switch>
                <AppRoute
                  exact
                  path='/'
                  component={Home}
                  layout={LayoutDefault}
                />
                <Route
                  exact
                  path='/login'
                  render={(props) => <Login {...props} />}
                  layout={LayoutDefault}
                />
                <Route
                  exact
                  path='/signup'
                  render={(props) => <Signup {...props} />}
                  layout={LayoutDefault}
                />
                <PrivateRoute
                  exact
                  path='/additions'
                  component={HouseAdditions}
                  layout={LayoutDefault}
                />
                <PrivateRoute
                  exact
                  path='/dashboard'
                  component={Dashboard}
                  layout={LayoutDefault}
                />
                <PrivateRoute
                  exact
                  path='/user'
                  component={User}
                  layout={LayoutDefault}
                />
              </Switch>
            </LayoutDefault>
          </>
        </Router>
      )}
    />
  )};

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
