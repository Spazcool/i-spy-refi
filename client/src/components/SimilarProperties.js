import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SimilarProperties() {
  const zillowpropid = '95354572';
  const finishedSqFt = '2466';
  // let result = 0;
  let avgSqFt = 0;
  let avgPerSqFt = 0;
  // let totalHouseValue = 0;
  // const [avgSqFt, setavgSqFt] = useState('');

  // const [avgPerSqFt, setavgPerSqFt] = useState('');

  const [totalHouseValue, settotalHouseValue] = useState('');

  useEffect(() => {
    houseSimilarProp();
  }, []);

  // useEffect(() => {}, [avgSqFt]);

  const houseSimilarProp = () => {
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
        let index = 0;

        for (let i = 0; i < comlength; i++) {
          avgSqFt +=
            response.data.comparables[i].lastSoldPrice.value /
            response.data.comparables[i].finishedSqFt;
          index = i+1;
        }
        console.log(avgSqFt);
        avgPerSqFt = avgSqFt / index;

        console.log(avgPerSqFt);

        // Calculating The House Value

        settotalHouseValue(finishedSqFt * avgPerSqFt);

        console.log('housevalue:' + totalHouseValue);

        // setavgSqFt(result);
        // console.log('result:' + avgSqFt);

        console.log('avgsqft:', avgPerSqFt);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='house-similarprop'>
      <h1>hello {totalHouseValue}</h1>
    </div>
  );
}
