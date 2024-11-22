/**
 * Module to configure and export application settings.
 *
 * @module configure
 */

const mixme = require("mixme");
const config_default = require("../conf/default");

/**
 * Merges custom configuration with the default configuration.
 *
 * @param {Object} [config_custom={}] - Custom configuration object.
 * @returns {Object} - Merged configuration object.
 */
module.exports = (config_custom = {}) => {
  const config = mixme.merge(config_default, config_custom);
  return config;
};
