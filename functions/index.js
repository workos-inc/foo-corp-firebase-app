const dotenv = require("dotenv");
const express = require("express");
const WorkOS = require("@workos-inc/node").default;
const admin = require("firebase-admin");

dotenv.config();
const app = express();
const port = process.env.SERVER_PORT;

//WorkOS Logic
const workos = new WorkOS(process.env.WORKOS_API_KEY);
const clientID = process.env.WORKOS_CLIENT_ID;

//Firebase logic
const firebaseApp = admin.initializeApp();

app.get("/callback", async (req, res) => {
  const { code } = req.query;

  const profile = await workos.sso.getProfile({
    code,
    clientID,
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
  res.redirect("/");
});

app.get("/auth", (_req, res) => {
  const domain = process.env.DOMAIN;
  const redirectURI = process.env.REDIRECT_URI;

  const authorizationURL = workos.sso.getAuthorizationURL({
    domain,
    redirectURI,
    clientID,
  });

  res.redirect(authorizationURL);
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at ${port}`);
});
