// todo push this up to the firebase server withthe following command
  // firebase deploy --only functions

// firebase deploy lint error:
* https://stackoverflow.com/questions/48602833/eslint-error-while-trying-to-deploy-firebase-functions

  // console.log('thing') // LOGS LEFT HERE CAN BE VIEWED IN THE FIREBASE CONSOLE WHEN THE ENDPOINT IS HIT

  {
        "source": "/api/secrets",
        "function": "app"
      },
      {
        "source": "/get",
        "function": "app"
      },

      ispyrefi-firebase-adminsdk-h65bj-21d25f5aa0.json


      https://blog.logrocket.com/user-authentication-firebase-react-apps/




      const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const functions = require('firebase-functions');
const admin = require('firebase-admin'); //a hack that allows us to bypass some auth stuff, todo lookup how to avoid using it
const apiKey = functions.config().zillow.key;
// ------------------------ ATTEMPTS AT LOCAL CONFIG OVERRIDES ------------------------

// firebase.initializeApp(process.env.NODE_ENV);

// if (process.env.NODE_ENV === 'development') {
//   console.log('yolo')
//   functions().useFunctionsEmulator('http://localhost:6001');
// }
// let config;
// if(location.hostname === 'localhost'){
//   config = {
//     databaseURL...
//   }
// }

// const serviceAccount = require("../key.json"); //used for interacting with DB during local dev

// ------------------------ 3 WAYS TO INITIALIZE APP ------------------------
// const firebaseApp = admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://ispyrefi.firebaseio.com"
// });
// const firebaseApp = admin.initializeApp(functions.config().firebase);
admin.initializeApp();

// ------------------------ EXAMPLE SERVER ROUTING STUFF ------------------------
// Automatically allow cross-origin requests
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
//   })
// );
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// app.use(myMiddleware);
app.get('/api/secrets', (req, res) => {
  res.json('Talk is cheap. Show me the code. -Linus Torvalds');
});

// ------------------------ EXAMPLE HITTING ZILLOW API FROM BACKEND ------------------------

// app.post('/zillow/results', (req, res) => {
//   //NOTE YOU CAN USE AXIOS, TO DO THIS MORE EASILY, JUST NEED TO INSTALL IT AS A DEPENDENCY
//   const apiKey = functions.config().zillow.key; // exists on prod, not sure how this works locally
//   const url = "http://zillow/to/the/place/get/the/thing";
//   const options = {
//     host: url,
//     method: 'GET',
//     headers: {
//       'content-type': 'application/octet-stream',
//       'x-rapidapi-host': 'zillow-com.p.rapidapi.com',
//       'x-rapidapi-key': apiKey,
//       useQueryString: true,
//     },
//     params: {
//       address: `${streetNumber} ${street}`,
//       citystatezip: `${city} ${state} ${zip}`,
//     },
//   };

//   const getReq = http.request(options,function(res){
//     res.on('data',function(data){
//       console.log(data);
//     });
//   });

//   getReq.end();
// })

// ------------------------ EXAMPLE OF USING A NORMAL VS CACHED RESPONSE ------------------------
// TO TEST OPEN TIMESTAMP IN URL, NOTICE THE TIME COLUMN UNDER NETWORK TAB
// OPEN TIMESTAMP-CACHED, REFRESH PAGE, NOTICE THAT SEXY DROP IN LOAD TIME
app.get('/timestamp', (req, res) => {
  res.send(`${Date.now()}`);
});

app.get('/timestamp-cached', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  res.send(`${Date.now()}`);
});

// ------------------------ EXAMPLE DB QUERY/RESPONSE ------------------------
// POSSIBLE WAY TO QUERY THE DATABASE IN THE BACKEND
// app.get('/get/db/items', (req, res) => {
// getDBItems()
//   .then(items => {
//     res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
//     res.send(items)
//     return;
//   })
//   .catch(console.log)
// });

app.get('/api/GetSearchResults', (req, res) => {
  // res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  console.log(req.query);
  // const zillow = new Zillow(
  //   '26d05b2092msh8d14d2474ce38e0p120b64jsn0baeb38641f3'

  // );
  let query = {
    // address: req.query.address,
    // citystatezip: req.query.citystatezip,
    address: req.query.street,
    citystatezip: req.query.citystatezip,
  };
  axios({
    method: 'GET',
    headers: {
      'content-type': 'application/octet-stream',
      'x-rapidapi-host': 'zillow-com.p.rapidapi.com',
      'x-rapidapi-key': apiKey,
      // useQueryString: true,
    },
    url: 'https://zillow-com.p.rapidapi.com/search/address',
    params: query,
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});
// ------------------------ EXAMPLE CRUD interfaces ------------------------

// ------------------------ EXAMPLE CRUD interfaces ------------------------
// app.post('/', (req, res) => res.send(Widgets.create()));
// app.put('/:id', (req, res) => res.send(Widgets.update(req.params.id, req.body)));
// app.delete('/:id', (req, res) => res.send(Widgets.delete(req.params.id)));
// app.get('/', (req, res) => res.json('what what!'));

// ------------------------ EXAMPLE URL of deployed cloud function ------------------------
// FYI this there is a rule in firebase.json file to redirect this URL to our home URL of https://ispyrefi.com
// without the redirect, it would look like:
// https://us-central1-ispyrefi.cloudfunctions.net/app

// Expose Express API as a single Cloud Function:
exports.thing = functions.https.onRequest(app);
