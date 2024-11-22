const express = require("express");
const userController = require("../controllers/user");

const userRouter = express.Router();

/**
 * User Router Module
 *
 * This module defines routes for user-related operations, including creating, retrieving,
 * updating, and deleting users. It utilizes the Express.js router and the userController
 * to handle requests and responses.
 */

userRouter

  /**
   * Creates a new user.
   * @route POST /
   * @param {Object} req - The request object.
   * @param {Object} req.body - The request body containing user details.
   * @param {string} req.body.username - The username of the new user.
   * @param {string} [req.body.firstname] - The first name of the new user.
   * @param {string} [req.body.lastname] - The last name of the new user.
   * @param {Object} resp - The response object.
   */
  .post("/", (req, resp) => {
    // Call the userController's create method with the request body
    userController.create(req.body, (err, res) => {
      let respObj;
      if (err) {
        // Handle error response
        respObj = {
          status: "error",
          msg: err.message,
        };
        return resp.status(400).json(respObj);
      }
      // Handle success response
      respObj = {
        status: "success",
        msg: res,
      };
      resp.status(201).json(respObj);
    });
  })

  /**
   * Retrieves a user by username.
   * @route GET /:username
   * @param {Object} req - The request object.
   * @param {Object} req.params - The route parameters.
   * @param {string} req.params.username - The username of the user to retrieve.
   * @param {Object} resp - The response object.
   */
  .get("/:username", (req, resp, next) => {
    const username = req.params.username;
    // Call the userController's get method with the username
    userController.get(username, (err, res) => {
      let respObj;
      if (err) {
        // Handle error response
        respObj = {
          status: "error",
          msg: err.message,
        };
        return resp.status(400).json(respObj);
      }
      // Handle success response
      respObj = {
        status: "success",
        msg: res,
      };
      resp.status(200).json(respObj);
    });
  })

  /**
   * Updates an existing user.
   * @route PUT /update
   * @param {Object} req - The request object.
   * @param {Object} req.body - The request body containing updated user details.
   * @param {string} req.body.username - The username of the user to update.
   * @param {string} [req.body.firstname] - The updated first name of the user.
   * @param {string} [req.body.lastname] - The updated last name of the user.
   * @param {Object} resp - The response object.
   */
  .put("/update", (req, resp) => {
    // Call the userController's update method with the request body
    userController.update(req.body, (err, res) => {
      let respObj;
      if (err) {
        // Handle error response
        respObj = {
          status: "error",
          msg: err.message,
        };
        return resp.status(400).json(respObj);
      }
      // Handle success response
      respObj = {
        status: "success",
        msg: res,
      };
      resp.status(200).json(respObj);
    });
  })

  /**
   * Deletes a user by username.
   * @route DELETE /:username
   * @param {Object} req - The request object.
   * @param {Object} req.params - The route parameters.
   * @param {string} req.params.username - The username of the user to delete.
   * @param {Object} resp - The response object.
   */
  .delete("/:username", (req, resp, next) => {
    const username = req.params.username;
    // Call the userController's delete method with the username
    userController.delete(username, (err, res) => {
      let respObj;
      if (err) {
        // Handle error response
        respObj = {
          status: "error",
          msg: err.message,
        };
        return resp.status(400).json(respObj);
      }
      // Handle success response
      respObj = {
        status: "success",
        msg: "Number of rows deleted: " + res,
      };
      resp.status(200).json(respObj);
    });
  });

// Export the userRouter module
module.exports = userRouter;
