# Firebase + WorkOS SSO Sample App

A NodeJS microservice for exchanging tokens between Firebase and WorkOS!

## Clone and Install

Clone this repo and install dependencies:

```sh
git clone git@github.com:workos-inc/foo-corp-firebase-app.git && cd foo-corp-firebase-app
```

Navigate to `src` and run:

```sh
yarn install
```
## Configure your environment

1. Grab your [API Key](https://dashboard.workos.com/api-keys).
2. Create an [SSO Connection](https://dashboard.workos.com/sso/connections).
3. Configure a [Redirect URI](https://dashboard.workos.com/sso/configuration).
4. Get your [Project ID](https://dashboard.workos.com/sso/configuration).
5. Create a `.env` file in the `src` directory of the project (see `src/.env.sample`) and fill in your information.

```javascript
const client = new WorkOS("$YOUR_API_KEY");
const domain = "$YOUR_DOMAIN";
const redirectURI = "$YOUR_REDIRECT_URI";
const projectID = "$YOUR_PROJECT_ID";
```
## Run the app

Start the app from the `src` directory:

```sh
yarn start
```