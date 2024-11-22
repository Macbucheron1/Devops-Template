/**
 * Main server module utilizing Express framework.
 *
 * @module server
 */

const express = require("express");
const userRouter = require("./routes/user");
const healthRouter = require("./routes/health");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swaggerConfig");
const path = require("path");

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
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/index.html")));

/**
 * Mounts the user router on the '/user' path.
 * This router is used to handle user-related requests.
 */
app.use("/user", userRouter);

/**
 * Mounts the health router on the '/health' path.
 * This router is used to check the health of the application.
 */
app.use("/health", healthRouter);

/**
 * Mounts the Swagger UI on the '/api-docs' path.
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

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
