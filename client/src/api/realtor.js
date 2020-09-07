import axios from 'axios';
require('dotenv').config();

export const realtor = {
  async getAddressDetails(propertyid) {
    let getaddressResponse;
    await axios({
      method: 'GET',
      url: 'https://realtor.p.rapidapi.com/properties/v2/detail',
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'realtor.p.rapidapi.com',
        'x-rapidapi-key': '26d05b2092msh8d14d2474ce38e0p120b64jsn0baeb38641f3',
        useQueryString: true,
      },
      params: {
        property_id: `${propertyid}`,
      },
    })
      .then((response) => {
        getaddressResponse = response;
        console.log('get address', response);
      })
      .catch((error) => {
        console.log(error);
      });
    return getaddressResponse;
  },

  async gethousevalue(cityfirestore, statefirestore) {
    let housemedian;
    await axios({
      method: 'GET',
      url: 'https://realtor.p.rapidapi.com/properties/v2/list-sold',
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'realtor.p.rapidapi.com',
        'x-rapidapi-key': '26d05b2092msh8d14d2474ce38e0p120b64jsn0baeb38641f3',
        useQueryString: true,
      },
      params: {
        sort: 'sold_date',
        city: `${cityfirestore}`,
        offset: '0',
        state_code: `${statefirestore}`,
        limit: '100',
      },
    })
      .then((response) => {
        let houseprice_array = [];
        let responsehouses = response.data.properties;
        console.log('resP:', responsehouses);

        responsehouses.forEach((responsehouse) => {
          //   console.log('responsehouse', responsehouse);
          //   const result = responsehouse.hasOwnProperty('building_size');
          //   console.log('result:', result);
          if (
            responsehouse.hasOwnProperty('building_size') &&
            responsehouse.building_size.size > 0
          ) {
            houseprice_array.push(
              parseInt(responsehouse.price / responsehouse.building_size.size)
            );
          }
        });

        const housearraymedian = houseprice_array.sort((a, b) => a - b);
        console.log('median:', housearraymedian);

        const mid = Math.floor(housearraymedian.length / 2);
        housemedian =
          housearraymedian.length % 2 !== 0
            ? housearraymedian[mid]
            : (housearraymedian[mid - 1] + housearraymedian[mid]) / 2;

        console.log(housemedian);
      })
      .catch((error) => {
        console.log(error);
      });
    return housemedian;
  },
};
