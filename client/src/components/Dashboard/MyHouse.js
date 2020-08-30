import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
//house disp (STEFFI)

import axios from 'axios';
import { DB } from '../../api/firestore';
import { AuthContext } from '../../providers/AuthProvider';

export default function MyHouse(props) {
  // house disp (STEFFI)

  const { user } = useContext(AuthContext);

  const [imageData, setImage] = useState([]);
  // const houseImage = '';
  useEffect(() => {
    fetchaddress();
  }, []);

  const fetchaddress = async () => {
    const houseinfoDB = async () => await DB.getHouseByOwner(user.user.uid);

    console.log('userid: ', user.user.uid);
    const [{ street, state, city, zip }] = await houseinfoDB();

    const data = {
      street,
      city,
      state,
      zip,
    };

    // HardCoded DATA
    const statedb = await data.state;
    const citydb = await data.city;
    const streetdb = await data.street;
    const zipdb = await data.zip;

    // const state = 'NH';
    // const city = 'portsmouth';
    // const street = '31 Sudbury St';
    // const zip = '03801';
    // setTimeout(() => {
    await axios({
      method: 'GET',
      url: 'https://zillow-com.p.rapidapi.com/search/address',
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'zillow-com.p.rapidapi.com',
        'x-rapidapi-key': '26d05b2092msh8d14d2474ce38e0p120b64jsn0baeb38641f3',
        useQueryString: true,
      },
      params: {
        address: `${streetdb}`,
        citystatezip: `${citydb} ${statedb} ${zipdb}`,
      },
    })
      .then((response) => {
        console.log(
          'streetcitystatezip:',
          streetdb,
          '||',
          citydb,
          statedb,
          zipdb
        );

        console.log('res', response.data[0].zpid);

        let id = response.data[0].zpid;
        setTimeout(
          () =>
            axios({
              method: 'GET',
              url: `https://zillow-com.p.rapidapi.com/property/${id}/media`,
              headers: {
                'content-type': 'application/octet-stream',
                'x-rapidapi-host': 'zillow-com.p.rapidapi.com',
                'x-rapidapi-key':
                  '26d05b2092msh8d14d2474ce38e0p120b64jsn0baeb38641f3',
                useQueryString: true,
              },
            })
              .then((response) => {
                console.log(
                  'RES IMG',
                  response.data.imageResults.images[0].highResUrl
                );
                setImage(response.data.imageResults.images[0].highResUrl);
              })
              .catch((error) => {
                console.log(error);
              }),
          2000
        );
      })
      .catch((error) => {
        console.log(error);
      });
    // }, 5000);
  };

  console.log('Image :', imageData);
  return (
    <Paper elevation={4} className='my-house'>
      <Card className='my-house'>
        <CardMedia
          className='media'
          //   image="/static/images/cards/contemplative-reptile.jpg"
          image='https://honka.com/wp-json/image/resize?w=900&h=600&src=uploads%2Fupload_35c14afec13dd0964987d96f8ee44a7e.jpg'
          //image={props.houseImage}
          title='My House'
        />
        <CardContent>
          <Typography variant='h5' component='h2'>
            34 Bromfield rd, apt.1
          </Typography>
          <Typography variant='h5' component='h2'>
            $360,000
          </Typography>
          <Typography variant='body2' component='p'>
            Description/Details
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
}
