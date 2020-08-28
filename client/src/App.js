import './App.css';
import React, { useContext } from 'react';
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';
import { AuthProvider, AuthContext } from './providers/AuthProvider';

import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import User from './pages/User';
import Splash from './pages/Splash';

import Navbar from './components/Navbar';
import HouseDisplay from './components/HouseDisplay';

import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    'margin-top': '6em',
    'margin-bottom': '5em',
  },
});

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
});

function App() {
  const { isAuth, user } = useContext(AuthContext);

  // here we are ceating a private route wrapper to prevent front end routing to
  // restricted pages.  The ({ component: Component, ...rest })  argument that is
  // passed to this functional component is essentially the same as just passing
  // props, but using object destucturing.  the ...rest is literally the rest of
  // the props that were not destructured.
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
  //todo displayname, if desirable, we'll need to make a call to the db to grab the user names for users that signed up with email
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

// Even though this is the App.js file, in the end we are not exactly exporting
// the App component.  We actually set up the app component to implement our react
// router, but in the end we export App wrapped in the context provider

// Here we export the final product of our app/context configuration, and
// even though it is unnamed here, it will be imported as App in index.js
export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>

    // <HouseDisplay />
  );
};
