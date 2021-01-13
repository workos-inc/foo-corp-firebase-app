const dotenv = require("dotenv");
const express = require("express");
const WorkOS = require("@workos-inc/node").default;
const admin = require("firebase-admin");

dotenv.config();
const app = express();
const port = process.env.SERVER_PORT;

/* WorkOS Logic */
const workos = new WorkOS(process.env.WORKOS_API_KEY);
//const projectID = process.env.WORKOS_PROJECT_ID;
//const domain = process.env.DOMAIN;
/* Your redirectURI should be your client */
//const redirectURI = process.env.REDIRECT_URI;

app.get("/auth", (_req, res) => {
  /*const authorizationURL = workos.sso.getAuthorizationURL({
    domain,
    projectID,
    redirectURI,
  });*/
  /* the following call is to test the output: current return value builds the URL as project_id, domain, redirect_uri, and then response_type=code. response_type=code should be at the beginning of the URL and is not explicitly definable in the old version of the SDK */
  //res.json(authorizationURL).send();
  res.redirect(process.env.AUTHORIZATION_URL);
});

//Firebase logic
const firebaseApp = admin.initializeApp();

app.get("/callback", async (req, res) => {
  const { code } = req.query;

  const profile = await workos.sso.getProfile({
    code,
    projectID: process.env.WORKOS_PROJECT_ID,
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
  //further response logic; not strictly necessary here
  //res.redirect("/");
});

// start server
app.listen(port, () => {
  console.log(`server started at ${port}`);
});
