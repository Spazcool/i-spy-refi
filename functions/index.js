const express = require('express');
const app = express();
const functions = require('firebase-functions');
const admin = require('firebase-admin'); 

admin.initializeApp();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.json());

// Expose Express API as a single Cloud Function:
exports.thing = functions.https.onRequest(app);
