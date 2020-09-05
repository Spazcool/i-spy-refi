import React, {useContext} from 'react'
import { AuthContext } from "../providers/AuthProvider";
import { Redirect } from 'react-router-dom'
import "../App.css";
import SignupForm from "../components/SignupForm";

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

function Signup(props) {
  const [spacing] = React.useState(2);
  const { isAuth } = useContext(AuthContext)

  return (
    isAuth ? <Redirect to='/dashboard' />
    :
    <Container className="signup">
      <h1>SignUp Page</h1>
      <Grid container justify="center" spacing={spacing}>
        <Grid item xs={12} md={6}>
          <SignupForm {...props}/>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Signup;
