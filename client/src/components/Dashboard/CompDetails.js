import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  root: {
    maxWidth: 445,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Paper elevation={4}>
    <Card className={classes.root}>

        <CardMedia
          className={classes.media}
        //   image="/static/images/cards/contemplative-reptile.jpg"
        image="https://honka.com/wp-json/image/resize?w=900&h=600&src=reference%2Fmelody%2Fhonka-mo-113.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
        <Typography variant='h4' component='h2'>
            34 Bromfield rd, apt.1
          </Typography>
          <Typography variant='h5' component='h2'>
            $360,000
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Description/Details
          </Typography>
        </CardContent>

      <CardActions>
        <Button size="small" color="primary">
          Button
        </Button>
        <Button size="small" color="primary">
          Button
        </Button>
      </CardActions>
    </Card>
    </Paper>
  );
}
