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
import Houses from './pages/Houses';
import Navbar from './components/Navbar';
import HouseDisplay from './components/HouseDisplay';

function App() {
  // Here we subscribe the authentication context using the useContext hook
  // we use isAuth to determine whether the user is logged in, and setIsAuth
  // to change their status on logout.
  const { isAuth, user } = useContext(AuthContext);
  // console.log("App auth: ", isAuth);
  // if(isAuth){
  //   console.log(user)
  // }

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
    <Router>
      <>
        <Navbar />
        <div>
          Sexy header to go here:{' '}
          {isAuth
            ? user.user.displayName
              ? user.user.displayName
              : user.user.email
            : ''}
        </div>
        <Switch>
          <Route exact path='/' render={(props) => <Dashboard {...props} />} />
          <Route exact path='/login' render={(props) => <Login {...props} />} />
          <Route
            exact
            path='/signup'
            render={(props) => <Signup {...props} />}
          />
          <PrivateRoute exact path='/houses' component={Houses} />
        </Switch>
      </>
    </Router>
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
