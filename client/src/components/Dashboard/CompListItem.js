import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  // root: {
  //   minWidth: 275,
  // },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Comp() {
  const classes = useStyles();

  return (
      <Card className={classes.root}>
              <CardActionArea>
        <CardContent>
          <Typography
            className={classes.title}
            color='textSecondary'
            gutterBottom
          >
            1.5 miles
          </Typography>
          <Typography variant='h5' component='h2'>
            34 Bromfield rd, apt.1
          </Typography>
          <Typography variant='h5' component='h2'>
            $360,000
          </Typography>
          <Typography className={classes.pos} color='textSecondary'>
            Somerville, MA
          </Typography>
          <Typography variant='body2' component='p'>
          Description/Details
          </Typography>
        </CardContent>
              </CardActionArea>
        <CardActions>
          <Button size='small'>Button</Button>
        </CardActions>
      </Card>
  );
}
