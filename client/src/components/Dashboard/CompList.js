import React, { useState, useEffect } from 'react';

import Paper from '@material-ui/core/Paper';
import CompListItem from './CompListItem';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  list: {
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
  const [loaded, setLoaded] = useState(false);
  const classes = useStyles();

  const checkLoaded = () => {
    const { compslist } = props;
    if (compslist.length > 0) setLoaded(true);
  };

  useEffect(() => {
    checkLoaded();
  });

  // console.log('compslist:', props.compslist);

  return loaded ? (
    <Paper elevation={4} className='card-radius box-shadow'>
      <div className={classes.list}>
        {props.compslist.map((comp, i) => (
          <CompListItem comp={comp} len={props.compslist.length -1} index={i} key={'compItem' + i} />
        ))}
      </div>
    </Paper>
  ) : (
    <Paper className='card-radius box-shadow'>
      <div className={classes.list}>
        {Array.from({ length: 10 }).map((e, i) => (
          <CompListItem key={'loading' + i} i={i} />
        ))}
      </div>
    </Paper>
  );
}
