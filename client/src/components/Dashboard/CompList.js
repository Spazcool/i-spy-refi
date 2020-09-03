import React, {useState, useEffect } from 'react';

import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CompListItem from './CompListItem';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  list: {
    height: '70vh',
    'overflow-y': 'scroll',
    width: '100%'
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
          {props.street.map((comp) => (
            <CompListItem comp={comp} />
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
