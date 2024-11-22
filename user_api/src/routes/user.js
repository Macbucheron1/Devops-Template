const express = require("express");
const userController = require("../controllers/user");

const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User management and operations
 */

/**
 * @swagger
 * /user/:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the new user.
 *                 example: Macbucheron
 *               firstname:
 *                 type: string
 *                 description: The first name of the new user.
 *                 example: Nathan
 *               lastname:
 *                 type: string
 *                 description: The last name of the new user.
 *                 example: Deprat
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
userRouter.post("/", (req, resp) => {
  userController.create(req.body, (err, res) => {
    let respObj;
    if (err) {
      respObj = { status: "error", msg: err.message };
      return resp.status(400).json(respObj);
    }
    respObj = { status: "success", msg: res };
    resp.status(201).json(respObj);
  });
});

/**
 * @swagger
 * /user/{username}:
 *   get:
 *     summary: Retrieve a user by username
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *           example: Macbucheron
 *         description: The username of the user to retrieve
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       400:
 *         description: Bad request
 */
userRouter.get("/:username", (req, resp, next) => {
  const username = req.params.username;
  userController.get(username, (err, res) => {
    let respObj;
    if (err) {
      respObj = { status: "error", msg: err.message };
      return resp.status(400).json(respObj);
    }
    respObj = { status: "success", msg: res };
    resp.status(200).json(respObj);
  });
});

/**
 * @swagger
 * /user/{username}:
 *   delete:
 *     summary: Delete a user by username
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *           example: Macbucheron
 *         description: The username of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Bad request
 */
userRouter.delete("/:username", (req, resp, next) => {
  const username = req.params.username;
  userController.delete(username, (err, res) => {
    let respObj;
    if (err) {
      respObj = { status: "error", msg: err.message };
      return resp.status(400).json(respObj);
    }
    respObj = { status: "success", msg: `Number of rows deleted: ${res}` };
    resp.status(200).json(respObj);
  });
});

/**
 * @swagger
 * /user/update:
 *   put:
 *     summary: Update an existing user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user to update.
 *                 example: Macbucheron
 *               firstname:
 *                 type: string
 *                 description: The updated first name of the user.
 *                 example: Ibrahim
 *               lastname:
 *                 type: string
 *                 description: The updated last name of the user.
 *                 example: Diallo
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 */
userRouter.put("/update", (req, resp) => {
  userController.update(req.body, (err, res) => {
    let respObj;
    if (err) {
      respObj = { status: "error", msg: err.message };
      return resp.status(400).json(respObj);
    }
    respObj = { status: "success", msg: res };
    resp.status(200).json(respObj);
  });
});

module.exports = userRouter;
