/**
 * Test suite for the configure module.
 * Uses Mocha as the testing framework and Chai for assertions.
 */

const { expect } = require("chai");
const configure = require("../src/configure");

describe("Configure", () => {
  /**
   * Test case: Load default JSON configuration file.
   * Expects the default Redis configuration to match the specified host and port.
   */
  it("load default json configuration file", () => {
    const config = configure();
    expect(config.redis).to.eql({ host: "127.0.0.1", port: 6379 });
  });

  /**
   * Test case: Load custom configuration.
   * Merges custom configuration with the default and checks if the result is as expected.
   */
  it("load custom configuration", () => {
    const config_custom = { custom: "value" };
    const config = configure(config_custom);
    expect(config).to.eql({
      redis: { host: "127.0.0.1", port: 6379 },
      custom: "value",
    });
  });
});
