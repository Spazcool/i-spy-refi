import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CompListItem from './CompListItem';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


const useStyles = makeStyles((theme) => ({
  list: {
    height: '70vh',
    'overflow-y': 'scroll',
    borderRadius: '30px',
    '&::-webkit-scrollbar': {
      width: '0.6em',
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(83,152,190,.3)',
      outline: '1px solid slategrey',
      padding: '10px',
      borderRadius: '30px',
    },
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  column: {
    width: '33.33%',
    height: 50,
  },
  
}));

export default function CompList(props) {
  const classes = useStyles();
  return (
    <Paper elevation={4} className='list card-radius box-shadow'>
      <div className={classes.list}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <CardContent>
              <Typography color='textSecondary' gutterBottom>
                1.5 miles
              </Typography>
              <Typography variant='h5' component='h2'>
                34 Bromfield rd, apt.1
              </Typography>
              <Typography variant='h5' component='h2'>
                $360,000
              </Typography>
              <Typography color='textSecondary'>Somerville, MA</Typography>
              <Typography variant='body2' component='p'>
                Description/Details
              </Typography>
            </CardContent>
          </AccordionSummary>
          <AccordionDetails>
            <CardContent>
              <Typography variant='body2' component='p'>
                Description/Details
              </Typography>
              <Typography variant='body2' component='p'>
                Description/Details
              </Typography>
              <Typography variant='body2' component='p'>
                Description/Details
              </Typography>
              <Typography variant='body2' component='p'>
                Description/Details
              </Typography>
              <Typography variant='body2' component='p'>
                Description/Details
              </Typography>
            </CardContent>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <CardContent>
              <Typography color='textSecondary' gutterBottom>
                1.5 miles
              </Typography>
              <Typography variant='h5' component='h2'>
                34 Bromfield rd, apt.1
              </Typography>
              <Typography variant='h5' component='h2'>
                $360,000
              </Typography>
              <Typography color='textSecondary'>Somerville, MA</Typography>
              <Typography variant='body2' component='p'>
                Description/Details
              </Typography>
            </CardContent>
          </AccordionSummary>
          <AccordionDetails>
            {/* <Grid item className="img-list img-accord" >
          <Paper className='img-accord' />
          </Grid>
          <Grid item className="img-list img-accord">
          <Paper className='img-accord ' />
          </Grid>
          <Grid item className="img-list img-accord">
          <Paper className='img-accord' />
          </Grid> */}
          <div className='details'>
            <GridList cellHeight={160} className='details' cols={3}>
              <GridListTile key={1} cols={1}>
                <img src='https://honka.com/wp-json/image/resize?w=900&h=600&src=reference%2Fmelody%2Fhonka-mo-113.jpg' alt='title' />
              </GridListTile>
              <GridListTile key={2} cols={1}>
                <img src='https://honka.com/wp-json/image/resize?w=900&h=600&src=reference%2Fmelody%2Fhonka-mo-113.jpg' alt='title' />
              </GridListTile>
              <GridListTile key={3} cols={1}>
                <img src='https://honka.com/wp-json/image/resize?w=900&h=600&src=reference%2Fmelody%2Fhonka-mo-113.jpg' alt='title' />
              </GridListTile>
            </GridList>
            
              {/* <div className='img-accord'>
                <Paper className='img-accord' />
              </div>
              <div className='img-accord'>
                <Paper className='img-accord' />
              </div>
              <div className='img-accord'>
                <Paper className='img-accord' />
              </div> */}
           
              

              <Typography variant='body2' component='p'>
                Description/Details
              </Typography>
              <Typography variant='body2' component='p'>
                Description/Details
              </Typography>
              <Typography variant='body2' component='p'>
                Description/Details
              </Typography>
              <Typography variant='body2' component='p'>
                Description/Details
              </Typography>
              <Typography variant='body2' component='p'>
                Description/Details
              </Typography>
            </div>
          </AccordionDetails>
        </Accordion>
        {props.street.map((comp) => (
          <CompListItem comp={comp} />
        ))}
      </div>
    </Paper>
  );
}
