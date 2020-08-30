const express = require('express');
const app = express();
const cors = require('cors');
const functions = require('firebase-functions');
const admin = require('firebase-admin'); //a hack that allows us to bypass some auth stuff, todo lookup how to avoid using it

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
// TODO IS THIS REQUIRED?
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// TODO Add middleware to authenticate requests
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
  res.send(`${Date.now()}`)
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
// })

// ------------------------ EXAMPLE INTERACTION WITH DB ------------------------
// function getDBItems(){
//   const ref = firebaseApp.firestore().collection('houses').orderBy('value', 'desc');
//   return ref.get();
// console.log(ref)
  // return ref.once('value').then(snap => snap.val())
 
  // const housesList = db.collection('houses');
  // const myHouse = db.collection('houses').doc('JWb8oyGegTY1HCi9XcaX');
  // const query = housesList.where('value', '>', 100000);
// }

// ------------------------ EXAMPLE MODIFYING DB ------------------------
// CALLED WHENEVER A HOUSE IS CREATED
// exports.sendMessage = functions.firestore
//   .document('houses/{houseID}')
//   .onCreate((snap, context) => {
//     const original = snap.data().original;
//     const value = snap.data().original.value;
//     functions.logger.log('sending message', context.params.houseID, context);
//     return snap.ref.update({message: `Yolo! called from cloud function`}, {merge: true});
//   })

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
