import React, { useState, useEffect } from 'react';
import axios from 'axios';
require('dotenv').config();

export default function SimilarProperties() {
  const zillowpropid = '95354572';
  const finishedSqFt = '2466';
  let avgSqFt = 0;
  let avgPerSqFt = 0;
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
        'x-rapidapi-key': process.env.REACT_APP_API_KEY,
        useQueryString: true,
      },
      params: {
        limit: '10',
      },
    })
      .then((response) => {
        let comlength = response.data.comparables.length;
        //console.log('complength' + comlength);
    

        // calculating the Average SqFt
        let index = 0;

        for (let i = 0; i < comlength; i++) {
          avgSqFt +=
            response.data.comparables[i].lastSoldPrice.value /
            response.data.comparables[i].finishedSqFt;
          index = i + 1;
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
