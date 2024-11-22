/**
 * Test suite for testing Redis connection.
 * Uses Mocha as the testing framework and Chai for assertions.
 */

const { expect } = require("chai");

let db;

describe("Redis", () => {
  /**
   * Hook that runs before all tests in this suite.
   * Requires the dbClient module to establish a connection to Redis.
   */
  before(() => {
    db = require("../src/dbClient");
  });

  /**
   * Test case: Verify that the application successfully connects to Redis.
   * Expects the 'connected' property of the Redis client to be true.
   */
  it("should connect to Redis", () => {
    expect(db.connected).to.eql(true);
  });
});

