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

import { DB } from '../../api/firestore';
import { AuthContext } from '../../providers/AuthProvider';
import { zillow } from '../../api/zillow';
export default function MyHouse(props) {
  // House Display Info Logic
  const { user } = useContext(AuthContext);
  const [imageData, setImage] = useState([]);
  const [streetdisplay, setstreetdisplay] = useState('');
  const [citydisplay, setcitydisplay] = useState('');
  const [statedisplay, setstatedisplay] = useState('');
  // House EVAL
  let result = 0;
  const finishedSqFt = '2466';
  let avgSqFt = 0;
  let avgPerSqFt = 0;
  const [index, setIndex] = useState(0);
  const [totalHouseValue, settotalHouseValue] = useState('');

  useEffect(() => {
    fetchaddress();
  }, []);

  const fetchaddress = async () => {
    const houseinfoDB = async () => await DB.getHouseByOwner(user.user.uid);

    // User id is passed once the user login is completed
    const [{ street, state, city, zip }] = await houseinfoDB();

    const data = {
      street,
      city,
      state,
      zip,
    };
    /////////////////// FIRST API CALL /////////////////

    const displayaddress = await zillow.getaddress(data);

    console.log('houseinfo from zillow :', displayaddress[0].zpid);
    // HardCoded DATA
    const statezillow = displayaddress[0].address.state;
    setstatedisplay(statezillow);
    const cityzillow = displayaddress[0].address.city;
    setcitydisplay(cityzillow);
    const streetzillow = displayaddress[0].address.street;
    setstreetdisplay(streetzillow);
    const zillowzpid = displayaddress[0].zpid;

    // const state = 'NH';
    // const city = 'portsmouth';
    // const street = '31 Sudbury St';
    // const zip = '03801';
    // setTimeout(() => {
    //////////////////////// SECOND CALL ///////////////////
    setTimeout(async () => {
      const getimageurl = await zillow.getzillowpropid(zillowzpid);
      setImage(getimageurl);
      console.log('getimageurl:', getimageurl);
    }, 1000);

    setTimeout(async () => {
      const houseval = await zillow.gethouseval(zillowzpid);
      console.log('gethouseval:', houseval);

      let comlength = houseval.data.comparables.length;
      //console.log('complength' + comlength);

      // calculating the Average SqFt
      let index = 0;

      for (let i = 0; i < comlength; i++) {
        avgSqFt +=
          houseval.data.comparables[i].lastSoldPrice.value /
          houseval.data.comparables[i].finishedSqFt;
        index = i + 1;
      }
      console.log(avgSqFt);
      avgPerSqFt = avgSqFt / index;

      console.log('avgpersqft:', avgPerSqFt);

      // Calculating The House Value

      const tot = Math.round(finishedSqFt * avgPerSqFt);
      settotalHouseValue(tot);
      console.log('housevalue:', tot);

      // setavgSqFt(result);
      // console.log('result:' + avgSqFt);

      console.log('avgsqft:', avgPerSqFt);
    }, 3000);
  };

  return (
    <Paper elevation={4} className='my-house'>
      <Card className='my-house'>
        <CardMedia className='media' image={imageData} title='My House' />
        <CardContent>
          <Typography variant='h5' component='h2'>
            {streetdisplay},{citydisplay},{statedisplay}
          </Typography>
          <Typography variant='h5' component='h2'>
            {'$'}{totalHouseValue}
          </Typography>
          <Typography variant='body2' component='p'>
            Description/Details
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
}
