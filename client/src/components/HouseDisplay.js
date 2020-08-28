import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function HouseDisplay() {
  const state = 'NH';
  const city = 'Portsmouth';
  const street = 'Sudbury St';
  const zip = '03801';
  let zillowpropid = '';
  const streetNumber = '31';

  const [imageData, setImage] = useState([]);

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://zillow-com.p.rapidapi.com/search/address',
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'zillow-com.p.rapidapi.com',
        'x-rapidapi-key': process.env.apikey,
        useQueryString: true,
      },
      params: {
        address: `${streetNumber} ${street}`,
        citystatezip: `${city} ${state} ${zip}`,
      },
    })
      .then((response) => {
        console.log('res', response.data[0].zpid);
        let id = response.data[0].zpid;
        setTimeout(
          () =>
            axios({
              method: 'GET',
              url: `https://zillow-com.p.rapidapi.com/property/${id}/media`,
              headers: {
                'content-type': 'application/octet-stream',
                'x-rapidapi-host': 'zillow-com.p.rapidapi.com',
                'x-rapidapi-key': process.env.apikey,
                useQueryString: true,
              },
            })
              .then((response) => {
                console.log(
                  'RES IMG',
                  response.data.imageResults.images[0].highResUrl
                );
                setImage(response.data.imageResults.images[0].highResUrl);
              })
              .catch((error) => {
                console.log(error);
              }),
          2000
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //console.log('Image :', imageData[0]);
  return (
    <div className='houseinfo'>
      <h1>hello {zillowpropid}</h1>
      <img src={imageData} alt='new' />
    </div>
  );
}
