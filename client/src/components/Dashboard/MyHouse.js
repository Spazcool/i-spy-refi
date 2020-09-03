import React, { useState, useEffect, useContext } from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  lazyImage: {
    width: '100%',
    'max-height': '150px',
    alignItems:"center",
    justifyContent:"center",
    display: 'flex',
  },
  block:{
    display: 'block',
  }
}));

export default function MyHouse(props) {
  const [loaded, setLoaded]= useState(false);
  const classes = useStyles();

  const checkLoaded = () => {
    const {imageData, street, description, value } = props;
    if(imageData && street){ // && description && value (if not all values are sent, the component never loads)
      setLoaded(true);
    }
  }

  useEffect(() => {
    checkLoaded();
  })

  return ( 
    loaded ? 
      <Card>
        <CardActionArea>
          <CardMedia className={classes.lazyImage} component='img' image={props.imageData} title='My House' />
          <CardContent className={classes.block}>
            <Typography variant='h5' component='h2'>
              {props.street} 
            </Typography>

            <h4>Value</h4>
            <Typography variant='body1' component='p'>
              $ {props.value}
            </Typography>

            <h4>Description/Details</h4>
            <Typography variant='body2' component='p'>
              {props.description} 
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    : 
      <Card> 
        <CardActionArea>
          <CardMedia className={classes.lazyImage} title='My House'><CircularProgress className={'mt-4'}/></CardMedia>
           <CardContent>
            <LinearProgress />
            <h4>Value</h4>
            <LinearProgress color='secondary'/>
            <h4>Description/Details</h4>
            <LinearProgress />
          </CardContent>
        </CardActionArea>
      </Card>
  )
}
