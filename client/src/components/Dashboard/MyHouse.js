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

export default function MyHouse(props) {
  //image={imageData}
  //,{citydisplay},{statedisplay}
  //  {totalHouseValue}

  return (
    <Paper boxShadow={8} className='card-radius box-shadow'>
      <Card className='card-radius' borderRadius={16}>
        <CardMedia className='media' image={props.imagedata} title='My House' />
        <CardContent className='list'>
          <Typography variant='h5' component='h2'>
            {props.street}, {props.city}, {props.state}
          </Typography>
          <Typography variant='h5' component='h2'>
            {'$'} {props.totalhouseValue}
          </Typography>
          <Typography variant='body2' component='p'>
            Description/Details
          </Typography>
        </CardContent>
        <CardActions className='list'>
          <Button size='small' className='button'>
            View Stats
          </Button>
        </CardActions>
      </Card>
    </Paper>
  );
}
