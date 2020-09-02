import React, { useState, useEffect, useContext } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { DB } from '../../api/firestore';
import { AuthContext } from '../../providers/AuthProvider';

export default function CompListItem({ comp }) {
  console.log(comp);
  console.log(comp.bathrooms);
  // let { comparables } = data;
  // console.log({ comparables });
  // const comparison = comparables.map((item) => (
  // <li key={item.zip}>{item.address.street}</li>
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography color='textSecondary' gutterBottom></Typography>
          <Typography variant='h5' component='h2'>
            {comp.address.street}
          </Typography>
          <Typography variant='h5' component='h2'>
            $ {comp.lastSoldPrice.value}
          </Typography>
          <Typography color='textSecondary'>
            {comp.address.city}, {comp.address.state},
          </Typography>
          <Typography variant='body2' component='p'>
            Last Sold Date:{comp.lastSoldDate}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small'>Button</Button>
      </CardActions>
    </Card>
  );
}
