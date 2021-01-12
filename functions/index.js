require('dotenv');
const express = require('express');
const WorkOS = require('@workos-inc/node');
const admin = require('firebase-admin');

const app = express();

//WorkOS Logic
const workos = new WorkOS(process.env.WORKOS_API_KEY);
const clientID = process.env.WORKOS_CLIENT_ID;

app.get('/callback', async (req, res) => {
  const { code } = req.query;

  const profile = await workos.sso.getProfile({
    code,
    clientID,
  })
}

res.redirect('/');

app.get('/auth', {_req, res) => {
  const domain = process.env.DOMAIN;
  const redirectURI = process.env.REDIRECT_URI;

  const authorizationURL = workos.sso.getAuthorizationURL({
    domain,
    redirectURI,
    clientID,
  });

  res.redirect(authorizationURL);
});

//Firebase logic
const firebaseApp = admin.initializeApp();

admin
  .auth()
  .createCustomToken(clientID)
  .then((customToken) => {
    //Send token to client
  })
  .catch((error) => {
    console.log('Error creating custom token: ', error);
  })
