import './App.css';
import React, { useContext, useRef, useEffect } from 'react';
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';

import { AuthProvider, AuthContext } from './providers/AuthProvider';
// import { CustomThemeProvider } from './providers/ThemeProvider'; //TODO DELETE

// import { useLocation } from 'react-router-dom';
import AppRoute from './utils/AppRoute';
import ScrollReveal from './utils/ScrollReveal';
import ReactGA from 'react-ga';
// Layouts
import LayoutDefault from './layouts/LayoutDefault';
// Views
import Home from './views/Home';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import User from './pages/User';
// import Splash from './pages/Splash';  // TODO DELETE
import Navbar from './components/Navbar'; // TODO DELETE
import HouseAdditions from './pages/HouseAdditions';
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
          <>
            <LayoutDefault>
              <Navbar className='navbar' />
              <Switch>
                <AppRoute
                  exact
                  path='/'
                  component={Home}
                  layout={LayoutDefault}
                />
                {/* <Route
                  exact
                  path='/'
                  render={(props) => <Splash {...props} />}
                /> */}
                <Route
                  exact
                  path='/login'
                  render={(props) => <Login {...props} />}
                />
                <Route
                  exact
                  path='/signup'
                  render={(props) => <Signup {...props} />}
                />
                {/* <PrivateRoute exact path='/houses' component={Houses} /> */}
                <PrivateRoute
                  exact
                  path='/additions'
                  component={HouseAdditions}
                />
                {/* <Route exact path='/signup' render={(props) => <Signup {...props} />} /> */}
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <PrivateRoute exact path='/user' component={User} />
              </Switch>
            </LayoutDefault>
          </>
        </Router>
      )}
    />
    // <Router>
    //   <>
    //     <Navbar className="navbar" />
    //     <Switch>
    //       <Route exact path='/' render={(props) => <Splash {...props} />} />
    //       <Route exact path='/login' render={(props) => <Login {...props} />} />
    //       <Route
    //         exact
    //         path='/signup'
    //         render={(props) => <Signup {...props} />}
    //       />
    //       {/* <PrivateRoute exact path='/houses' component={Houses} /> */}
    //       <PrivateRoute
    //         exact
    //         path='/additions'
    //         component={HouseAdditions}
    //       />
    //       {/* <Route exact path='/signup' render={(props) => <Signup {...props} />} /> */}
    //       <PrivateRoute exact path='/dashboard' component={Dashboard} />
    //       <PrivateRoute exact path='/user' component={User} />
    //     </Switch>
    //   </>
    // </Router>
  );
};

export default () => {
  return (
    <AuthProvider>
      {/* <LayoutDefault /> */}
      {/* <CustomThemeProvider> // TODO ERASE */}
      {/* <CssBaseline /> // TODO ERASE - was overwriting color */}
      <App />
      {/* </CustomThemeProvider> */}
    </AuthProvider>
  );
};
