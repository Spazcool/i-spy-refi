import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DB } from '../api/firestore';

export default function HouseDisplay() {
  const [imageData, setImage] = useState([]);
  const [HouseInfo, setHousenfo] = useState('');

  useEffect(() => {
    fetchaddress();
  }, []);

  const fetchaddress = async () => {
    const userDB = async () =>
      await DB.getHouseByID('MznGptrV4Zd5dzwtgo46');
    const { street, city, state, zip } = await userDB();
    const data = {
      street,
      city,
      state,
      zip,
    };
    setHousenfo(data);
  };

  console.log('houseinfo:', HouseInfo);
  // HardCoded DATA

  const state = 'NH';
  const city = 'Portsmouth';
  const street = ' 31 Sudbury St';
  const zip = '03801';
  let zillowpropid = '';

  // useEffect(() => {
  //   axios({
  //     method: 'GET',
  //     url: 'https://zillow-com.p.rapidapi.com/search/address',
  //     headers: {
  //       'content-type': 'application/octet-stream',
  //       'x-rapidapi-host': 'zillow-com.p.rapidapi.com',
  //       'x-rapidapi-key': process.env.apikey,
  //       useQueryString: true,
  //     },
  //     params: {
  //       address: `${street}`,
  //       citystatezip: `${city} ${state} ${zip}`,
  //     },
  //   })
  //     .then((response) => {
  //       console.log('res', response.data[0].zpid);
  //       let id = response.data[0].zpid;
  //       setTimeout(
  //         () =>
  //           axios({
  //             method: 'GET',
  //             url: `https://zillow-com.p.rapidapi.com/property/${id}/media`,
  //             headers: {
  //               'content-type': 'application/octet-stream',
  //               'x-rapidapi-host': 'zillow-com.p.rapidapi.com',
  //               'x-rapidapi-key': process.env.apikey,
  //               useQueryString: true,
  //             },
  //           })
  //             .then((response) => {
  //               console.log(
  //                 'RES IMG',
  //                 response.data.imageResults.images[0].highResUrl
  //               );
  //               setImage(response.data.imageResults.images[0].highResUrl);
  //             })
  //             .catch((error) => {
  //               console.log(error);
  //             }),
  //         2000
  //       );
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  //console.log('Image :', imageData[0]);
  return (
    <div className='houseinfo'>
      {/* <h1>hello {zillowpropid}</h1>
      <img src={imageData} alt='new' /> */}
    </div>
  );
}
