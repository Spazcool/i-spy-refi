import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
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

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    'max-height': '300px',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  block: {
    display: 'block',
  },
}));
export default withRouter(function MyHouse(props) {
  const [loaded, setLoaded] = useState(false);
  const classes = useStyles();

  const checkLoaded = () => {
    const { imageData, street, description, value } = props;
    if (value) {
      //presumes value will take the longest to load
      setLoaded(true);
    }
  };

  useEffect(() => {
    checkLoaded();
  }, [props]);

  return loaded ? (
    <Paper className='card-radius box-shadow'>
      <Card className='card-radius'>
        <CardActionArea>
          <CardMedia
            className={classes.lazyImage}
            component='img'
            image={props.imageData}
            title='My House'
          />
          <CardContent className={classes.block}>
            <Typography variant='h5' component='h2'>
              {props.street}, {props.city}, {props.state}
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
      <Accordion className='card-radius-bottom'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography color='textSecondary' gutterBottom>
            View Stats
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CardContent>
            <Typography color='textSecondary' gutterBottom></Typography>
            <Typography variant='h5' component='h2'>
              {props.street}, {props.city}, {props.state}
            </Typography>
            <Typography variant='h5' component='h2'>
              $ {props.value}
            </Typography>
            <Typography color='textSecondary'>{props.description}</Typography>
            <Typography variant='body2' component='p'>
              {/* Last Sold Date:{props.lastSoldDate} */}
            </Typography>
          </CardContent>
          <CardActions className={classes.root}>
            <Button
              size='small'
              className='button'
              onClick={(e) => {
                e.preventDefault();
                props.history.push('/additions');
              }}
            >
              Update Stats
            </Button>
          </CardActions>
        </AccordionDetails>
      </Accordion>
    </Paper>
  ) : (
    <Paper className='card-radius box-shadow'>
      <Card className='card-radius-top'>
        <CardActionArea>
          <CardMedia className={classes.lazyImage} title='My House'>
            <CircularProgress className={'mt-4'} />
          </CardMedia>
          <CardContent>
            <h4>Value</h4>
            <h4>Description/Details</h4>
            <LinearProgress />
          </CardContent>
        </CardActionArea>
      </Card>
      <Accordion className='card-radius-bottom'>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography color='textSecondary' gutterBottom>
            View Stats
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CardActions className={classes.root}>
            <Button size='small' className='button'>
              Update Stats
            </Button>
          </CardActions>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
});
