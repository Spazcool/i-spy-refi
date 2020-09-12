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
        'x-rapidapi-key': process.env.REACT_APP_API_KEY,
        useQueryString: true,
      },
      params: {
        property_id: `${propertyid}`,
      },
    })
      .then((response) => {
        getaddressResponse = response;
      })
      .catch((error) => {
        console.log(error);
      });
    console.log('actual address resp:', getaddressResponse);
    return getaddressResponse;
  },

  async autoCompleteApi(params) {
    let autoComplete;
    await axios({
      method: 'GET',
      url: 'https://realtor.p.rapidapi.com/locations/auto-complete',
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'realtor.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_API_KEY,
        useQueryString: true,
      },
      params: {
        input: `${params.street} ${params.city} ${params.zip} ${params.state}`,
      },
    })
      .then((response) => {
        autoComplete = response;
      })
      .catch((error) => {
        autoComplete = error;
      });
    return autoComplete;
  },

  // Gets mortgage rates based off address of Zip
  async getMortgageRates(zipfirestore) {
    let getZipAddress;
    await axios({
      method: 'GET',
      url: 'https://realtor.p.rapidapi.com/finance/rates',
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'realtor.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_API_KEY,
        useQueryString: true,
      },
      params: {
        loc: `${zipfirestore}`,
      },
    })
      .then((response) => {
        getZipAddress = response.data.rates;
      })
      .catch((error) => {
        console.log(error);
      });

    return getZipAddress;
  },

  async gethousevalue(cityfirestore, statefirestore) {
    let houseResponse;
    await axios({
      method: 'GET',
      url: 'https://realtor.p.rapidapi.com/properties/v2/list-sold',
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'realtor.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_API_KEY,
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
        houseResponse = response;
      })
      .catch((error) => {
        console.log(error);
      });
    console.log('houseresp:', houseResponse);
    return houseResponse;
  },
};
