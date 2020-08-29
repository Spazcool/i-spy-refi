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
//   root: {
//     maxWidth: 445,
//   },
  media: {
    height: 140,
  },
});

export default function MyHouse() {
  const classes = useStyles();

  return (
    <Paper elevation={4} className="my-house">
    <Card className="my-house">
   
        <CardMedia
          className={classes.media}
        //   image="/static/images/cards/contemplative-reptile.jpg"
        image="https://honka.com/wp-json/image/resize?w=900&h=600&src=uploads%2Fupload_35c14afec13dd0964987d96f8ee44a7e.jpg"
          title="My House"
        />
        <CardContent>
        <Typography variant='h5' component='h2'>
            34 Bromfield rd, apt.1
          </Typography>
          <Typography variant='h5' component='h2'>
            $360,000
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Description/Details
          </Typography>
        </CardContent>
    </Card>
    </Paper>
  );
}
