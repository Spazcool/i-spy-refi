import axios from 'axios';

export const zillow = {
  async getaddress(obj) {
    //get address api
    let addressdata;
    // console.log('object:', obj);
    await axios({
      method: 'GET',
      url: 'https://zillow-com.p.rapidapi.com/search/address',
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'zillow-com.p.rapidapi.com',
        'x-rapidapi-key': '26d05b2092msh8d14d2474ce38e0p120b64jsn0baeb38641f3',
        useQueryString: true,
      },
      params: {
        address: `${obj.street}`,
        citystatezip: `${obj.city} ${obj.state} ${obj.zip}`,
      },
    })
      .then((response) => {
        console.log(
          'streetcitystatezip:',
          obj.street,
          '||',
          obj.city,
          obj.state,
          obj.zip
        );

        // console.log('res', response.data);

        addressdata = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    //console.log('res1', addressdata);

    return addressdata;
  },

  async getzillowpropid(zillowid) {
    let imageUrl;
    //await setTimeout(() => {
    const Imageurl = `https://zillow-com.p.rapidapi.com/property/${zillowid}/media`;
    console.log('object1:', Imageurl);
    await axios({
      method: 'GET',
      url: Imageurl,
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'zillow-com.p.rapidapi.com',
        'x-rapidapi-key': '26d05b2092msh8d14d2474ce38e0p120b64jsn0baeb38641f3',
        useQueryString: true,
      },
    })
      .then(async (response) => {
        //console.log('RES IMG', response.data.imageResults.images[0].highResUrl);
        imageUrl = await response.data.imageResults.images[0].highResUrl;
        // setImage(response.data.imageResults.images[0].highResUrl);
        // console.log('end return');
      })
      .catch((error) => {
        console.log(error);
      });
    // }, 2000);

    return imageUrl;
  },

  async gethouseval(zillowidhval) {
    let houseresponse;

    const Houseval = `https://zillow-com.p.rapidapi.com/property/${zillowidhval}/compset`;
    await axios({
      method: 'GET',
      url: Houseval,
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'zillow-com.p.rapidapi.com',
        'x-rapidapi-key': '26d05b2092msh8d14d2474ce38e0p120b64jsn0baeb38641f3',
        useQueryString: true,
      },
      params: {
        limit: '10',
      },
    })
      .then(async (response) => {
        // console.log('housevalres:', response);

        houseresponse = await response;
        // let comlength = await response.data.comparables.length;
        // console.log('complength' + comlength);
        // let lastsoldPrice = await response.data.comparables[0].lastSoldPrice
        //   .value;
        // let finishedSqFt = await response.data.comparables[0].finishedSqFt;

        // //// trying to work the code here
        // console.log('lastsoldprice', lastsoldPrice);
        // console.log('finishedsq', finishedSqFt);
      })
      .catch((error) => {
        console.log(error);
      });

    return houseresponse;
  },
};
