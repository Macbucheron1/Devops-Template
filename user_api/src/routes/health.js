const express = require("express");
const db = require("../dbClient");

const healthRouter = express.Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Get the health of the application
 *     tags: [HEALTH]
 *     responses:
 *       200:
 *         description: App healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uptime:
 *                   type: number
 *                   description: The uptime of the application
 *                 status:
 *                   type: string
 *                   description: The status of the application
 *                 timestamp:
 *                   type: number
 *                   description: The current timestamp
 *       503:
 *         description: App unhealthy
 */
healthRouter.get("/", (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    status: "OK",
    timestamp: Date.now(),
  };

  db.ping((err, result) => {
    if (err || result !== "PONG") {
      console.error("Redis ping failed:", err);
      healthcheck.status = "error";
      return res.status(503).send(healthcheck);
    } else {
      // Redis is healthy
      return res.status(200).send(healthcheck);
    }
  });
});


module.exports = healthRouter;
