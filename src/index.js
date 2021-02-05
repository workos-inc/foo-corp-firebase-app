const dotenv = require("dotenv");

dotenv.config();
const app = require("./app");
const port = process.env.SERVER_PORT;

/* start server */
app.listen(port, () => {
  console.log(`server started at ${port}`);
});
