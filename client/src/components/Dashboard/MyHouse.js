import React, { useState, useEffect, useContext } from 'react';

import Paper from '@material-ui/core/Paper';
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
    if(value){ //presumes value will take the longest to load
      setLoaded(true);
    }
  }

  useEffect(() => {
    checkLoaded();
  },[props])

  return ( 
    loaded ? 
      <Paper className='card-radius box-shadow'>
        <Card className='card-radius'>
          <CardActionArea>
            <CardMedia className={classes.lazyImage} component='img' image={props.imageData} title='My House' />
            <CardContent className={classes.block}>
              <Typography variant='h5' component='h2'>
                {props.street}, {props.city}, {props.state}
              </Typography>

              <h4>Value</h4>
              <Typography variant='body1' component='p'>
                $ {props.value}
              </Typography>
              <Typography variant='body2' component='p'>
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className='list'>
            <Button size='small' className='button'>
              View Stats
            </Button>
          </CardActions>
        </Card>
      </Paper>
    : 
      <Paper className='card-radius box-shadow'>
        <Card className='card-radius'>
          <CardActionArea>
            <CardMedia className={classes.lazyImage} title='My House'><CircularProgress className={'mt-4'}/></CardMedia>
            <CardContent>
              <h4>Value</h4>
              <h4>Description/Details</h4>
              <LinearProgress />
            </CardContent>
          </CardActionArea>
          <CardActions className='list'>
            <Button size='small' className='button'>
              View Stats
            </Button>
          </CardActions>
        </Card>
      </Paper>
  )
}
