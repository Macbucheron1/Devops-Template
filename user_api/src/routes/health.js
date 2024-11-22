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
healthRouter.get("/", async (req, res, next) => {
  const healthcheck = {
    uptime: process.uptime(),
    status: "OK",
    timestamp: Date.now(),
  };

  try {
    if (db.server_info.aof_last_write_status === "ok")
      res.status(200).send(healthcheck);
    else {
      healthcheck.status = "error";
      res.status(503).send(healthcheck);
    }
  } catch (error) {
    healthcheck.status = "error";
    res.status(503).send(healthcheck);
  }
});

module.exports = healthRouter;
