import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CompListItem from './CompListItem';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 275,
    // '& > *': {
    //   margin: theme.spacing(1),
    //   width: theme.spacing(24),
    //   height: theme.spacing(24),
    // },
    height: '100vh',
    'overflow-y': 'scroll',
  },
}));

export default function CompList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={4}>
        <CompListItem />
        <CompListItem />
        <CompListItem />
        <CompListItem />
        <CompListItem />
      </Paper>
    </div>
  );
}
