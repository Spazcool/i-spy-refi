const axios = require('axios');
export const Zillow = {
  async getZillow(req) {
    console.log(req);
    //   const res = await fetch("/api/workouts/" + id, {
    //     method: "PUT",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(data)
    //   });
    const { address, city, zip, state } = req;
    await fetch(
      `https://zillow-com.p.rapidapi.com/search/address?=${address}&citystatezip=${city}%20${state}%20${zip}`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/octet-stream',
          'x-rapidapi-host': 'zillow-com.p.rapidapi.com',
          'x-rapidapi-key':
            '26d05b2092msh8d14d2474ce38e0p120b64jsn0baeb38641f3',
          // useQueryString: true,}
        },
      }
    )
      .then((res) => {
        // console.log(res.json());
        return res.json();
      })
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
    //   axios({
    //     method: 'GET',
    //     url: 'http://localhost:5000/api/GetSearchResults',

    //     params: {
    //       address: `${address}`,
    //       citystatezip: `${city} ${state} ${zip}`,
    //       // rentzestimate: false,
    //       //   address: encodeURIComponent(userHouse.street),
    //       // citystatezip: encodeURIComponent(
    //       //   userHouse.city,
    //       //   userHouse.state,
    //       //   userHouse.zip
    //       // ),
    //       // rentzestimate: false,
    //     },

    //     // req: {
    //     //   body: JSON.stringify({
    //     //     address: encodeURIComponent(userHouse.street),
    //     //     citystatezip: encodeURIComponent(
    //     //       userHouse.city,
    //     //       userHouse.state,
    //     //       userHouse.zip
    //     //     ),
    //     //     rentzestimate: false,
    //     //   }),
    //     // },
    //   })
    //     .then((res) => console.log(res))
    //     .catch((err) => console.log(err));
    // },
  },
};
