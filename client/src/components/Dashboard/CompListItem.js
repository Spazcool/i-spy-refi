import React from 'react';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  center: {
    alignItems:"center",
    justifyContent:"center",
    display: 'flex',
  },
}));

export default function CompListItem({ comp }) {
  const classes = useStyles();

  return (
    comp ? 
      <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Typography color='textSecondary' gutterBottom>
          summary
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
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
        <CardActions className={classes.center}>
          <Button size='small' className='button'><CircularProgress/></Button>
        </CardActions>
      </AccordionDetails>
    </Accordion>
    :
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Typography color='textSecondary' gutterBottom>
          summary
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <CardContent>
          <Typography variant='h5' component='h2'>
          </Typography>
          <LinearProgress/>
          <br/>
          <Typography variant='h5' component='h2'>
          </Typography>
          <LinearProgress color='secondary'/>
        </CardContent>
        <CardActions className={classes.center}>
          <Button size='small' className='button'><CircularProgress/></Button>
        </CardActions>
      </AccordionDetails>
    </Accordion>
  );
}
