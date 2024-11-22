/**
 * Main server module utilizing Express framework.
 *
 * @module server
 */

const express = require("express");
const userRouter = require("./routes/user");
const bodyParser = require("body-parser");

const app = express();

/**
 * Port number on which the server will listen.
 * Defaults to 3000 if not specified in environment variables.
 *
 * @type {number}
 */
const port = process.env.PORT || 3000;

/**
 * Import the database client.
 */
const db = require("./dbClient");

/**
 * Event listener for database connection errors.
 */
db.on("error", (err) => {
  console.error(err);
});

/**
 * Middleware to parse URL-encoded data using querystring library.
 */
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

/**
 * Middleware to parse incoming JSON requests.
 */
app.use(bodyParser.json());

/**
 * Root route serving a simple greeting.
 *
 * @name GET /
 * @function
 * @inner
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 */
app.get("/", (req, res) => res.send("Hello World!"));

/**
 * Mounts the user router on the '/user' path.
 */
app.use("/user", userRouter);

/**
 * Starts the server and listens on the specified port.
 *
 * @type {Server}
 */
const server = app.listen(port, (err) => {
  if (err) throw err;
  console.log("Server listening on port " + port);
});

/**
 * Exports the server instance for external use.
 */
module.exports = server;
