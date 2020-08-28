import React from 'react';
import axios from 'axios';

export default function SimilarProperties() {
  const zillowpropid = '95354572';

  axios({
    method: 'GET',
    url: `https://zillow-com.p.rapidapi.com/property/${zillowpropid}/compset`,
    headers: {
      'content-type': 'application/octet-stream',
      'x-rapidapi-host': 'zillow-com.p.rapidapi.com',
      'x-rapidapi-key': '1768c0c17amsh8d6bab5e9fe23ffp1f4c9ajsna6b8dd6f9e86',
      useQueryString: true,
    },
    params: {
      limit: '10',
    },
  })
    .then((response) => {
      console.log('properties :', response);
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
