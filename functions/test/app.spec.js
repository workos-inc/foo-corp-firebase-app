const dotenv = require("dotenv");
const request = require("jest");
const WorkOS = require("@workos-inc/node").default;
const app = require("../app");

dotenv.config();

describe("Test /auth endpoint", () => {
  it("It should generate an authorizationURL", () => {
    const workos = new WorkOS(process.env.WORKOS_TEST_KEY);

    const authorizationUrl = workos.sso.getAuthorizationURL({
      domain: "lyft.com",
      clientID: "proj_123",
      redirectURI: "example.com/sso/workos/callback",
    });
    expect(authorizationUrl).toBe(
      "https://api.workos.com/sso/authorize?domain=lyft.com&redirect_uri=example.com%2Fsso%2Fworkos%2Fcallback&response_type=code"
    );
  });
});
