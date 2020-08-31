import axios from 'axios';

export const zillow = {
  async getaddress(obj) {
    //get address api
    let addressdata;
    console.log('object:', obj);
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

        console.log('res', response.data);

        addressdata = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log('res1', addressdata);

    return addressdata;
  },

  async getzillowpropid(zillowid) {
    let imageUrl;
    await setTimeout(() => {
      const Imageurl = `https://zillow-com.p.rapidapi.com/property/${zillowid}/media`;
      console.log('object1:', Imageurl);
      axios({
        method: 'GET',
        url: Imageurl,
        headers: {
          'content-type': 'application/octet-stream',
          'x-rapidapi-host': 'zillow-com.p.rapidapi.com',
          'x-rapidapi-key':
            '26d05b2092msh8d14d2474ce38e0p120b64jsn0baeb38641f31`',
          useQueryString: true,
        },
      })
        .then((response) => {
          console.log(
            'RES IMG',
            response.data.imageResults.images[0].highResUrl
          );
          imageUrl = response.data.imageResults.images[0].highResUrl;
          // setImage(response.data.imageResults.images[0].highResUrl);
          console.log('end return');
          return imageUrl;
        })
        .catch((error) => {
          console.log(error);
        });
    }, 2000);
  },

  async gethouseval(zillowidhval) {
    const Houseval = `https://zillow-com.p.rapidapi.com/property/${zillowidhval}/compset`;
    axios({
      method: 'GET',
      url: Houseval,
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'zillow-com.p.rapidapi.com',
        'x-rapidapi-key': '26d05b2092msh8d14d2474ce38e0p120b64jsn0baeb38641f31',
        useQueryString: true,
      },
      params: {
        limit: '10',
      },
    })
      .then((response) => {
        console.log('housevalres:');
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
