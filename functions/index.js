// todo push this up to the firebase server withthe following command
  // firebase deploy --only functions

const express = require('express');
const app = express();
const cors = require('cors');
const functions = require('firebase-functions');
const admin = require('firebase-admin'); //a hack that allows us to bypass some auth stuff, todo lookup how to avoid using it

// EXAMPLE INTERACTION WITH DB
admin.initializeApp();
exports.sendMessage = functions.firestore
  .document('houses/{houseID}')
  .onCreate((snap, context) => {
    const original = snap.data().original;
    // const value = snap.data().original.value;
    functions.logger.log('sending message', context.params.houseID, context);
    return snap.ref.update({message: `Yolo! called from cloud function`}, {merge: true});
  })


//EXAMPLE SERVER ROUTING STUFF

// TODO IS THIS REQUIRED?
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// TODO Add middleware to authenticate requests
// app.use(myMiddleware);
app.get('/api/secrets', (req, res) => {
  res.json('Talk is cheap. Show me the code. -Linus Torvalds');
});
// build multiple CRUD interfaces:
app.get('/get', (req, res) => res.json('uolo'));
// app.post('/', (req, res) => res.send(Widgets.create()));
// app.put('/:id', (req, res) => res.send(Widgets.update(req.params.id, req.body)));
// app.delete('/:id', (req, res) => res.send(Widgets.delete(req.params.id)));
// app.get('/', (req, res) => res.json('what what!'));


// Expose Express API as a single Cloud Function:
exports.widgets = functions.https.onRequest(app);

// https://us-central1-ispyrefi.cloudfunctions.net/widgets