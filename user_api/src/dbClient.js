/**
 * Module to create and export a Redis client instance.
 *
 * @module db
 */

var redis = require("redis");
const configure = require("./configure");

/**
 * Retrieves configuration settings.
 *
 * @type {Object}
 */
const config = configure();

/**
 * Creates a Redis client with specified host, port, and retry strategy.
 *
 * @type {RedisClient}
 */
var db = redis.createClient({
  host: process.env.REDIS_HOST || config.redis.host,
  port: process.env.REDIS_PORT || config.redis.port,
  /**
   * Custom retry strategy for the Redis client.
   * Retries every 10 seconds when an error occurs.
   *
   * @returns {number|Error}
   */
  retry_strategy: (options) => {
    console.log("Retry strategy called", options);
    if (options.error && options.error.code === "ECONNREFUSED") {
      console.error("The server refused the connection");
      if (options.attempt > 10) {
        console.error("Max attempts reached");
        return false;
      }
      return 5000;
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      console.error("Retry time exhausted");
      return new Error("Retry time exhausted");
    }
    // Reconnect after 5 seconds
    console.log("Reconnecting in 5 seconds");
    return 5000;
  },
});

db.on("error", (err) => {
  console.log(db);
  console.error("Redis connection error:", err);
});

db.on("ready", () => {
  console.log("Successfully connected to Redis after retrying.");
});

/**
 * Gracefully handles process termination by quitting the Redis client.
 */
process.on("SIGINT", function () {
  db.quit();
});

/**
 * Exports the Redis client instance for use in other modules.
 */
module.exports = db;
