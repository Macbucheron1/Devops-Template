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
  host: config.redis.host,
  port: config.redis.port,
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
