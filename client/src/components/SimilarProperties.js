import React, { useState } from 'react';
import axios from 'axios';

export default function SimilarProperties() {
  const zillowpropid = '95354572';
  const finishedSqFt = '2466';
  let result = 0;
  let i;
  let avgPerSqFt = 0;
  let totalHouseValue = 0;
  const [avgSqFt, setavgSqFt] = useState('');

  axios({
    method: 'GET',
    url: `https://zillow-com.p.rapidapi.com/property/${zillowpropid}/compset`,
    headers: {
      'content-type': 'application/octet-stream',
      'x-rapidapi-host': 'zillow-com.p.rapidapi.com',
      'x-rapidapi-key': '26d05b2092msh8d14d2474ce38e0p120b64jsn0baeb38641f31',
      useQueryString: true,
    },
    params: {
      limit: '10',
    },
  })
    .then((response) => {
      let comlength = response.data.comparables.length;
      //console.log('complength' + comlength);
      // let lastsoldPrice = response.data.comparables[0].lastSoldPrice.value;
      //let finishedSqFt = response.data.comparables[0].finishedSqFt;

      //   // trying to work the code here
      // console.log('lastsoldprice', lastsoldPrice);
      // console.log('finishedsq', finishedSqFt);

      // calculating the Average SqFt
      for (i = 0; i < comlength; i++) {
        result +=
          response.data.comparables[i].lastSoldPrice.value /
          response.data.comparables[i].finishedSqFt;
      }
      setavgSqFt(result);
      console.log('result:' + avgSqFt);

      avgPerSqFt = result / i;
      console.log('avgsqft:', avgPerSqFt);

      // Calculating The House Value
      totalHouseValue = finishedSqFt * avgPerSqFt;

      console.log('housevalue:' + totalHouseValue);
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <div className='house-similarprop'>
      <h1>hello </h1>
    </div>
  );
}
