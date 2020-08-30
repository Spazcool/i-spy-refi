import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DB } from '../api/firestore';
import { AuthContext } from '../providers/AuthProvider';

export default function HouseDisplay() {
  const { user } = useContext(AuthContext);
  const [imageData, setImage] = useState([]);
   let zillowpropid = '';

  useEffect(() => {
    fetchaddress();
  }, []);

  const fetchaddress = async () => {
    const houseinfoDB = async () => await DB.getHouseByOwner(user.user.uid);

    console.log('userid: ', user.user.uid);
    const [{ street, state, city, zip }] = await houseinfoDB();

    const data = {
      street,
      city,
      state,
      zip,
    };
    //setHousenfo(data);
    const statedb = await data.state;
    const citydb = await data.city;
    const streetdb = await data.street;
    const zipdb = await data.zip;

    // HardCoded DATA
    // const statedb = await HouseInfo.state;
    // const citydb = await HouseInfo.city;
    // const streetdb = await HouseInfo.street;
    // const zipdb = await HouseInfo.zip;

    // const state = 'NH';
    // const city = 'portsmouth';
    // const street = '31 Sudbury St';
    // const zip = '03801';
    setTimeout(() => {
      axios({
        method: 'GET',
        url: 'https://zillow-com.p.rapidapi.com/search/address',
        headers: {
          'content-type': 'application/octet-stream',
          'x-rapidapi-host': 'zillow-com.p.rapidapi.com',
          'x-rapidapi-key':
            '26d05b2092msh8d14d2474ce38e0p120b64jsn0baeb38641f31',
          useQueryString: true,
        },
        params: {
          address: `${streetdb}`,
          citystatezip: `${citydb} ${statedb} ${zipdb}`,
        },
      })
        .then((response) => {
         // console.log('houseinfo:', HouseInfo);

          console.log(
            'streetcitystatezip:',
            streetdb,
            '||',
            citydb,
            statedb,
            zipdb
          );
          console.log('res', response);
          let id = response.data[0].zpid;
          setTimeout(
            () =>
              axios({
                method: 'GET',
                url: `https://zillow-com.p.rapidapi.com/property/${id}/media`,
                headers: {
                  'content-type': 'application/octet-stream',
                  'x-rapidapi-host': 'zillow-com.p.rapidapi.com',
                  'x-rapidapi-key':
                    '26d05b2092msh8d14d2474ce38e0p120b64jsn0baeb38641f31',
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
    }, 5000);
  };

  // const getHouseDisplay = () => {
  // };

  console.log('Image :', imageData[0]);
  return (
    <div className='houseinfo'>
      {/* <h1>hello {zillowpropid}</h1>
      <img src={imageData} alt='new' /> */}
    </div>
  );
}
