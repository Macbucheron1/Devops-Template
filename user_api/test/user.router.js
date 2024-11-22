/**
 * Test suite for testing the User REST API.
 * Uses Mocha as the testing framework, Chai for assertions, and Chai-HTTP for HTTP requests.
 */

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../src/index");
const db = require("../src/dbClient");
const userController = require("../src/controllers/user");

chai.use(chaiHttp);

describe("User REST API", () => {
  /**
   * Hook that runs before each test case.
   * Cleans the Redis database to ensure a consistent state.
   */
  beforeEach(() => {
    db.flushdb();
  });

  /**
   * Hook that runs after all tests in the suite.
   * Closes the server and Redis client to free up resources.
   */
  after(() => {
    app.close();
    db.quit();
  });

  describe("POST /user", () => {
    /**
     * Test case: Create a new user.
     * Sends a POST request with valid user data and verifies the response.
     */
    it("create a new user", (done) => {
      const user = {
        username: "Macbucheron",
        firstname: "Nathan",
        lastname: "Deprat",
      };
      chai
        .request(app)
        .post("/user")
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(201);
          chai.expect(res.body.status).to.equal("success");
          chai.expect(res).to.be.json;
          done();
        })
        .catch((err) => {
          throw err;
        });
    });

    /**
     * Test case: Pass invalid parameters for user creation.
     * Sends a POST request with missing fields and verifies the error response.
     */
    it("pass wrong parameters", (done) => {
      const user = {
        firstname: "Nathan",
        lastname: "Deprat",
      };
      chai
        .request(app)
        .post("/user")
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(400);
          chai.expect(res.body.status).to.equal("error");
          chai.expect(res).to.be.json;
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
  });

  describe("GET /user", () => {
    /**
     * Test case: Retrieve an existing user.
     * Sends a GET request for a valid username and verifies the response.
     */
    it("get an existing user", (done) => {
      const user = {
        username: "Macbucheron",
        firstname: "Nathan",
        lastname: "Deprat",
      };
      // Create a user
      userController.create(user, () => {
        // Retrieve the user
        chai
          .request(app)
          .get("/user/" + user.username)
          .then((res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res.body.status).to.equal("success");
            chai.expect(res).to.be.json;
            done();
          })
          .catch((err) => {
            throw err;
          });
      });
    });

    /**
     * Test case: Attempt to retrieve a non-existent user.
     * Sends a GET request with an invalid username and verifies the error response.
     */
    it("can not get a user when it does not exist", (done) => {
      chai
        .request(app)
        .get("/user/invalid")
        .then((res) => {
          chai.expect(res).to.have.status(400);
          chai.expect(res.body.status).to.equal("error");
          chai.expect(res).to.be.json;
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
  });

  describe("PUT /user", () => {
    /**
     * Test case: Update an existing user.
     * Sends a PUT request with valid updated data and verifies the response.
     */
    it("update an existing user", (done) => {
      const user = {
        username: "Macbucheron",
        firstname: "Nathan",
        lastname: "Deprat",
      };
      // Create a user
      userController.create(user, () => {
        // Update the user
        chai
          .request(app)
          .put("/user/update")
          .send({
            username: user.username,
            firstname: "Ibrahim",
            lastname: "Diallo",
          })
          .then((res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res.body.status).to.equal("success");
            chai.expect(res).to.be.json;
            done();
          })
          .catch((err) => {
            throw err;
          });
      });
    });

    /**
     * Test case: Attempt to update a non-existent user.
     * Sends a PUT request with invalid user data and verifies the error response.
     */
    it("can not update a user when it does not exist", (done) => {
      chai
        .request(app)
        .put("/user/update")
        .send({
          username: "invalid",
          firstname: "Ibrahim",
          lastname: "Diallo",
        })
        .then((res) => {
          chai.expect(res).to.have.status(400);
          chai.expect(res.body.status).to.equal("error");
          chai.expect(res).to.be.json;
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
  });

  describe("DELETE /user", () => {
    /**
     * Test case: Delete an existing user.
     * Sends a DELETE request for a valid username and verifies the response.
     */
    it("delete an existing user", (done) => {
      const user = {
        username: "Macbucheron",
        firstname: "Nathan",
        lastname: "Deprat",
      };
      // Create a user
      userController.create(user, () => {
        // Delete the user
        chai
          .request(app)
          .delete("/user/" + user.username)
          .then((res) => {
            chai.expect(res).to.have.status(200);
            chai.expect(res.body.status).to.equal("success");
            chai.expect(res).to.be.json;
            done();
          })
          .catch((err) => {
            throw err;
          });
      });
    });

    /**
     * Test case: Attempt to delete a non-existent user.
     * Sends a DELETE request with an invalid username and verifies the error response.
     */
    it("can not delete a user when it does not exist", (done) => {
      chai
        .request(app)
        .delete("/user/invalid")
        .then((res) => {
          chai.expect(res).to.have.status(400);
          chai.expect(res.body.status).to.equal("error");
          chai.expect(res).to.be.json;
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
  });
});
