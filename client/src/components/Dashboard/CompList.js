import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CompListItem from './CompListItem';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 275,
  },
  list: {
    height: '70vh',
    'overflow-y': 'scroll',
  },
}));

export default function CompList() {
  const classes = useStyles();

  return (
    <Paper elevation={4} className={classes.root}>
      <div className={classes.list}>
        <CompListItem />
        <CompListItem />
        <CompListItem />
        <CompListItem />
        <CompListItem />
      </div>
    </Paper>
  );
}
