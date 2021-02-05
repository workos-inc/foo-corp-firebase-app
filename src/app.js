const dotenv = require("dotenv");
const express = require("express");
const WorkOS = require("@workos-inc/node").default;
const admin = require("firebase-admin");

dotenv.config();
const app = express();

/* WorkOS Logic */
const workos = new WorkOS(process.env.WORKOS_API_KEY);
const projectID = process.env.WORKOS_PROJECT_ID;
const domain = process.env.DOMAIN;
/* Your redirectURI should be your client */
const redirectURI = process.env.REDIRECT_URI;

app.get("/auth", (_req, res) => {
  const authorizationURL = workos.sso.getAuthorizationURL({
    projectID,
    domain,
    redirectURI,
  });
  res.redirect(authorizationURL);
});

/* Firebase logic */
const firebaseApp = admin.initializeApp();

app.get("/callback", async (req, res) => {
  const { code } = req.query;

  const profile = await workos.sso.getProfile({
    code,
    projectID: projectID,
  });

  try {
    const firebaseToken = await firebaseApp
      .auth()
      .createCustomToken(profile.id);
    console.log(firebaseToken);
    //Send your custom token to your client:
    //res.send(firebaseToken);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error minting token.");
  }
});

module.exports = app;
