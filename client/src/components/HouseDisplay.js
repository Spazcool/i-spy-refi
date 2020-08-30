import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { DB } from '../api/firestore';
import { AuthContext } from '../providers/AuthProvider';

export default function HouseDisplay() {
  const { user } = useContext(AuthContext);
  const [imageData, setImage] = useState([]);
  const [HouseInfo, setHousenfo] = useState('');

  useEffect(() => {
    fetchaddress();
  }, []);

  const fetchaddress = async () => {
    const houseinfoDB = async () => await DB.getHouseByOwner(user.user.uid);

    console.log('userid: ', user.user.uid);
    // const { street, city, state, zip } = await houseinfoDB();
    const [{ street, state, city, zip }] = await houseinfoDB();

    //  console.log('houseinfo:', street);

    // const userDB = async () => await DB.getHouseByID('MznGptrV4Zd5dzwtgo46');
    // const { street, city, state, zip } = await userDB();
    const data = {
      street,
      city,
      state,
      zip,
    };
    setHousenfo(data);
  };

  console.log('houseinfo:', HouseInfo.street);

  // HardCoded DATA

  const state = HouseInfo.state;
  const city = HouseInfo.city;
  const street = HouseInfo.street;
  const zip = HouseInfo.zip;

  // let zillowpropid = '';

  // const getHouseDisplay = () => {
  //   axios({
  //     method: 'GET',
  //     url: 'https://zillow-com.p.rapidapi.com/search/address',
  //     headers: {
  //       'content-type': 'application/octet-stream',
  //       'x-rapidapi-host': 'zillow-com.p.rapidapi.com',
  //       'x-rapidapi-key':
  //         '26d05b2092msh8d14d2474ce38e0p120b64jsn0baeb38641f31',
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
  //               'x-rapidapi-key':
  //                 '26d05b2092msh8d14d2474ce38e0p120b64jsn0baeb38641f31',
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
  // };

  console.log('Image :', imageData[0]);
  return (
    <div className='houseinfo'>
      {/* <h1>hello {zillowpropid}</h1>
      <img src={imageData} alt='new' /> */}
    </div>
  );
}
