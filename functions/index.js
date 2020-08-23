const express = require('express');
const app = express();
const cors = require('cors');
const functions = require('firebase-functions');
const admin = require('firebase-admin'); //a hack that allows us to bypass some auth stuff, todo lookup how to avoid using it
var serviceAccount = require("../key.json"); //used for interacting with DB during local dev

// ------------------------ 3 WAYS TO INITIALIZE APP ------------------------
const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ispyrefi.firebaseio.com"
});
// admin.initializeApp();
// const firebaseApp = admin.initializeApp(functions.config().firebase);

// ------------------------ EXAMPLE INTERACTION WITH DB ------------------------
function getDBItems(){
  const ref = firebaseApp.firestore().collection('houses').orderBy('value', 'desc');
  return ref.get();
// console.log(ref)
  // return ref.once('value').then(snap => snap.val())
 
  // const housesList = db.collection('houses');
  // const myHouse = db.collection('houses').doc('JWb8oyGegTY1HCi9XcaX');
  // const query = housesList.where('value', '>', 100000);
}

// ------------------------ EXAMPLE MODIFYING DB ------------------------
// exports.sendMessage = functions.firestore
//   .document('houses/{houseID}')
//   .onCreate((snap, context) => {
//     const original = snap.data().original;
//     // const value = snap.data().original.value;
//     functions.logger.log('sending message', context.params.houseID, context);
//     return snap.ref.update({message: `Yolo! called from cloud function`}, {merge: true});
//   })

// ------------------------ EXAMPLE SERVER ROUTING STUFF ------------------------
// TODO IS THIS REQUIRED?
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// TODO Add middleware to authenticate requests
// app.use(myMiddleware);
app.get('/api/secrets', (req, res) => {
  res.json('Talk is cheap. Show me the code. -Linus Torvalds');
});

// ------------------------ EXAMPLE OF USING A NORMAL VS CACHED RESPONSE ------------------------
// TO TEST OPEN TIMESTAMP IN URL, NOTICE THE TIME COLUMN UNDER NETWORK TAB
// OPEN TIMESTAMP-CACHED, REFRESH PAGE, NOTICE THAT SEXY DROP IN LOAD TIME
app.get('/timestamp', (req, res) => res.send(`${Date.now()}`));
app.get('/timestamp-cached', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  res.send(`${Date.now()}`);

  // getDBItems()
  //   .then(items => {
  //     res.set('Cache-Control', 'public, max-age=300, s-maxage=600');
  //     res.send(items)
  //     return;
  //   })
  //   .catch(console.log)

});

// ------------------------ EXAMPLE CRUD interfaces ------------------------

// app.post('/', (req, res) => res.send(Widgets.create()));
// app.put('/:id', (req, res) => res.send(Widgets.update(req.params.id, req.body)));
// app.delete('/:id', (req, res) => res.send(Widgets.delete(req.params.id)));
// app.get('/', (req, res) => res.json('what what!'));

// Expose Express API as a single Cloud Function:
exports.app = functions.https.onRequest(app);

// ------------------------ EXAMPLE URL of deployed cloud function ------------------------
// FYI this there is a rule in firebase.json file to redirect this URL to our home URL of https://ispyrefi.com:
// https://us-central1-ispyrefi.cloudfunctions.net/app