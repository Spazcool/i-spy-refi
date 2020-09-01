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


  return (
    <Paper elevation={4} className='my-house'>
      <Card className='my-house'>
        <CardMedia className='media' title='My House' />
        <CardContent>
          <Typography variant='h5' component='h2'></Typography>
          <Typography variant='h5' component='h2'>
            {'$'}
          </Typography>
          <Typography variant='body2' component='p'>
            Description/Details
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
}
