import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

// House Display Info

import axios from 'axios';
import { DB } from '../../api/firestore';
import { AuthContext } from '../../providers/AuthProvider';

export default function MyHouse(props) {
  // House Display Info Logic

  const { user } = useContext(AuthContext);
  const [imageData, setImage] = useState([]);
  const [streetdisplay, setstreetdisplay] = useState('');
  const [citydisplay, setcitydisplay] = useState('');

  // House EVAL

  const zillowpropid = '95354572';
  const finishedSqFt = '2466';
  let avgSqFt = 0;
  let avgPerSqFt = 0;
  const [totalHouseValue, settotalHouseValue] = useState('');

  useEffect(() => {
    fetchaddress();
  }, []);

  const fetchaddress = async () => {
    const houseinfoDB = async () => await DB.getHouseByOwner(user.user.uid);

    //1. console.log('userid: ', user.user.uid);
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
    setcitydisplay(citydb);
    const streetdb = await data.street;
    setstreetdisplay(streetdb);
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
        // 2 console.log(
        //   'streetcitystatezip:',
        //   streetdb,
        //   '||',
        //   citydb,
        //   statedb,
        //   zipdb
        // );

        // 3 console.log('res', response.data);

        let id = response.data[0].zpid;

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
            // 4 console.log(
            //   'RES IMG',
            //   response.data.imageResults.images[0].highResUrl
            // );
            setImage(response.data.imageResults.images[0].highResUrl);

            // TO GET THE HOUSE EVALUTION BASED ON THE AVG SQ FT ////
            setTimeout(
              () =>
                axios({
                  method: 'GET',
                  url: `https://zillow-com.p.rapidapi.com/property/${id}/compset`,
                  headers: {
                    'content-type': 'application/octet-stream',
                    'x-rapidapi-host': 'zillow-com.p.rapidapi.com',
                    'x-rapidapi-key':
                      '26d05b2092msh8d14d2474ce38e0p120b64jsn0baeb38641f3',
                    useQueryString: true,
                  },
                  params: {
                    limit: '10',
                  },
                })
                  .then((response) => {
                    let comlength = response.data.comparables.length;
                    //console.log('complength' + comlength);

                    // calculating the Average SqFt
                    let index = 0;

                    for (let i = 0; i < comlength; i++) {
                      avgSqFt +=
                        response.data.comparables[i].lastSoldPrice.value /
                        response.data.comparables[i].finishedSqFt;
                      index = i + 1;
                    }
                    console.log('avgsqft: ', avgSqFt);
                    avgPerSqFt = avgSqFt / index;

                    console.log('avgpersqft:', avgPerSqFt);

                    // Calculating The House Value

                    settotalHouseValue(finishedSqFt * avgPerSqFt);

                    console.log('housevalue:' + totalHouseValue);

                    // setavgSqFt(result);
                    // console.log('result:' + avgSqFt);
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Paper elevation={4} className='my-house'>
      <Card className='my-house'>
        <CardMedia className='media' image={imageData} title='My House' />
        <CardContent>
          <Typography variant='h5' component='h2'>
            {streetdisplay},{citydisplay}
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
