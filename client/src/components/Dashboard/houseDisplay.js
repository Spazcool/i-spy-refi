import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DB } from '../api/firestore';
import { AuthContext } from '../providers/AuthProvider';
import MyHouse from '../components/Dashboard/MyHouse';

export default function HouseDisplay(props) {
  const { user } = useContext(AuthContext);
  const [imageData, setImage] = useState([]);

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

    // HardCoded DATA
    const statedb = await data.state;
    const citydb = await data.city;
    const streetdb = await data.street;
    const zipdb = await data.zip;

    // const state = 'NH';
    // const city = 'portsmouth';
    // const street = '31 Sudbury St';
    // const zip = '03801';
    // setTimeout(() => {
    await axios({
      method: 'GET',
      url: 'https://zillow-com.p.rapidapi.com/search/address',
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'zillow-com.p.rapidapi.com',
        'x-rapidapi-key': '26d05b2092msh8d14d2474ce38e0p120b64jsn0baeb38641f31',
        useQueryString: true,
      },
      params: {
        address: `${streetdb}`,
        citystatezip: `${citydb} ${statedb} ${zipdb}`,
      },
    })
      .then((response) => {
        console.log(
          'streetcitystatezip:',
          streetdb,
          '||',
          citydb,
          statedb,
          zipdb
        );

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
          1100
        );
      })
      .catch((error) => {
        console.log(error);
      });
    // }, 5000);
  };

  console.log('Image :', imageData);
  return (
    <div className='houseinfo'>
      {/* <h1>hello {zillowpropid}</h1> */}
      {/* <img src={imageData} alt='new' /> */}

      {/* <MyHouse {...(houseImage = { imageData })} /> */}
    </div>
  );
}
