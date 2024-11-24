/**
 * Module to create and export a Redis client instance.
 *
 * @module db
 */

var redis = require("redis");
require("dotenv").config({ path: ".env.local" });

// Use environment variables for Redis configuration
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST || "127.0.0.1";
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || null;

if (!REDIS_HOST || !REDIS_PORT || !REDIS_PASSWORD) {
  throw new Error("Missing Redis configuration");
}


/**
 * Creates a Redis client with specified host, port, and retry strategy.
 *
 * @type {RedisClient}
 */
var db = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD,
  tls: { servername: REDIS_HOST },
  /**
   * Custom retry strategy for the Redis client.
   * Returns an error when retry time is exhausted.
   *
   * @returns {Error}
   */
  retry_strategy: () => {
    return new Error("Retry time exhausted");
  },
});

db.on("error", function (err) {
  console.error("Redis error: ", err);
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
