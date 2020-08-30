import React, { useState, useEffect, useContext } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { DB } from '../../api/firestore';
import { AuthContext } from '../../providers/AuthProvider';

function SimilarProperties() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const getUser = async () => {
    let userDB = await DB.getUser(user.user.uid);
    // setZpid(userDB.zpid);
    return userDB;
  };
  useEffect(() => {
    getUser().then((user) =>
      fetch(
        `https://zillow-com.p.rapidapi.com/property/${user.zpid}/compset?limit=10`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'zillow-com.p.rapidapi.com',
            'x-rapidapi-key':
              '26d05b2092msh8d14d2474ce38e0p120b64jsn0baeb38641f3',
          },
        }
      )
        .then((res) => res.json(res))
        .then(setData)
        .catch(console.error)
    );
  }, []);

  if (data.comparables) {
    console.log(data);
    // console.log(data.comparables[0].bathrooms);
    // console.log(data.comparables.zip);
    let { comparables } = data;
    console.log({ comparables });
    const comparibles = comparables.map((item) => (
      <li key={item.zip}>{item.address.street}</li>
    ));
    return comparibles;

    // <Card>
    //   <CardActionArea>
    //     <CardContent>
    //       <Typography color='textSecondary' gutterBottom></Typography>
    //       <Typography variant='h5' component='h2'>
    //         {data.comparables[0].address.street}
    //       </Typography>
    //       <Typography variant='h5' component='h2'>
    //         $ {data.comparables[0].lastSoldPrice.value}
    //       </Typography>
    //       <Typography color='textSecondary'>
    //         {data.comparables[0].address.city},{' '}
    //         {data.comparables[0].address.state},
    //       </Typography>
    //       <Typography variant='body2' component='p'>
    //         Last sold {data.comparables[0].lastSoldDate}
    //       </Typography>
    //       <Typography variant='body2' component='p'>
    //         Description/Details
    //       </Typography>
    //     </CardContent>
    //   </CardActionArea>
    //   <CardActions>
    //     <Button size='small'>Button</Button>
    //   </CardActions>
    // </Card>
    // returns all data
  }
  return <></>;
  // <div className='SimilarProperties'></div>;
}

export default SimilarProperties;
