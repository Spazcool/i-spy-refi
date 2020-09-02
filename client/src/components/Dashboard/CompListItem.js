import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default function Comp() {
  return (
    <Card>
      <CardActionArea>
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
      </CardActionArea>
      <CardActions>
        <Button size='small' className='button'>Button</Button>
      </CardActions>
    </Card>
  );
}
