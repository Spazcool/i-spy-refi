import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function SimilarProperties(props) {
  console.log(props);
  const zpid = 95354572;
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(
      `https://zillow-com.p.rapidapi.com/property/${zpid}/compset?limit=10`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'zillow-com.p.rapidapi.com',
          'x-rapidapi-key':
            '26d05b2092msh8d14d2474ce38e0p120b64jsn0baeb38641f3',
        },
      }
    )
      .then((res) => res.json(res))
      .then(setData)

      .catch(console.error);
  }, []);

  if (data) {
    console.log(data);
    console.log(data.comparables[0].bathrooms);
    console.log(data.comparables.zip);

    return (
      <div>
        {data.map((item) => (
          <Card>
            <CardActionArea>
              <CardContent>
                <Typography color='textSecondary' gutterBottom></Typography>
                <Typography variant='h5' component='h2'>
                  {item.comparables.address.street}
                </Typography>
                <Typography variant='h5' component='h2'>
                  $ {item.comparables.lastSoldPrice.value}
                </Typography>
                <Typography color='textSecondary'>
                  {item.comparables.address.city},{' '}
                  {item.comparables.address.state},
                </Typography>
                <Typography variant='body2' component='p'>
                  Last sold {item.comparables.lastSoldDate}
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
        ))}
      </div>
    );
    // returns all data
  }

  return <div className='SimilarProperties'></div>;
}

export default SimilarProperties;
