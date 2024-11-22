const db = require("../dbClient");

/**
 * User Data Access Object (DAO) module.
 * Provides methods for creating, retrieving, updating, and deleting user records in the database.
 */
module.exports = {
  /**
   * Creates a new user in the database.
   * @param {Object} user - The user object containing user details.
   * @param {string} user.username - The unique username of the user.
   * @param {string} [user.firstname] - The first name of the user.
   * @param {string} [user.lastname] - The last name of the user.
   * @param {Function} callback - The callback function to execute after the operation completes.
   */
  create: (user, callback) => {
    // Validate that the username is provided
    if (!user.username)
      return callback(new Error("Username must be provided"), null);

    // Prepare the user object to be stored
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    };

    // Check if the user already exists in the database
    db.hgetall(user.username, function (err, result) {
      if (err) return callback(err, null);
      if (!result) {
        // Save the new user to the database
        db.hmset(user.username, userObj, (err, result) => {
          if (err) return callback(err, null);
          callback(null, result); // Return success
        });
      } else {
        // User already exists
        callback(new Error("User already exists"), null);
      }
    });
  },

  /**
   * Retrieves a user from the database.
   * @param {string} username - The username of the user to retrieve.
   * @param {Function} callback - The callback function to execute after the operation completes.
   */
  get: (username, callback) => {
    // Validate that the username is provided
    if (!username)
      return callback(new Error("Username must be provided"), null);

    // Fetch the user data from the database
    db.hgetall(username, function (err, result) {
      if (err) return callback(err, null);
      if (result) callback(null, result); // Return the user data
      else callback(new Error("User doesn't exist"), null); // User not found
    });
  },

  /**
   * Updates an existing user in the database.
   * @param {Object} user - The user object containing updated user details.
   * @param {string} user.username - The unique username of the user to update.
   * @param {string} [user.firstname] - The updated first name of the user.
   * @param {string} [user.lastname] - The updated last name of the user.
   * @param {Function} callback - The callback function to execute after the operation completes.
   */
  update: (user, callback) => {
    // Validate that the username is provided
    if (!user.username)
      return callback(new Error("Username must be provided"), null);

    // Prepare the updated user object
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    };

    // Check if the user exists in the database
    db.hgetall(user.username, function (err, result) {
      if (err) return callback(err, null);
      if (result) {
        // Update the user data in the database
        db.hmset(user.username, userObj, (err, result) => {
          if (err) return callback(err, null);
          callback(null, result); // Return success
        });
      } else {
        // User doesn't exist
        callback(new Error("User doesn't exist"), null);
      }
    });
  },

  /**
   * Deletes a user from the database.
   * @param {string} username - The username of the user to delete.
   * @param {Function} callback - The callback function to execute after the operation completes.
   */
  delete: (username, callback) => {
    // Validate that the username is provided
    if (!username)
      return callback(new Error("Username must be provided"), null);

    // Delete the user from the database
    db.del(username, function (err, result) {
      if (err) return callback(err, null);
      if (result) callback(null, result); // Return success
      else callback(new Error("User doesn't exist"), null); // User not found
    });
  },
};
