import React, {useState, useEffect } from 'react';

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

import { makeStyles } from '@material-ui/core/styles';

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
  const [loaded, setLoaded]= useState(false);
  const classes = useStyles();

  const checkLoaded = () => {
    const {street} = props;
    if(street.length > 0) setLoaded(true);
  }

  useEffect(() => {
    checkLoaded();
  })

  return (
    loaded ? 
      <Paper elevation={4} className={classes.root}>
        <div className={classes.list}>
          {props.street.map((comp,i) => (
            <CompListItem comp={comp} key={'compItem'+i}/>
          ))}
        </div>
      </Paper>
    :
      <Paper className={classes.root}>
        <div className={classes.list}>
          {Array.from({length: 10}).map((e,i) => (
            <CompListItem key={'loading'+i}/>
          ))}
        </div>
    </Paper>
  );
}
