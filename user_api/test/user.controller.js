/**
 * Test suite for user-related operations using the User Controller.
 * Uses Mocha as the testing framework and Chai for assertions.
 */

const { expect } = require("chai");
const userController = require("../src/controllers/user");
const db = require("../src/dbClient");

describe("User", () => {
  /**
   * Hook that runs before each test case.
   * Cleans the Redis database to ensure a consistent state.
   */
  beforeEach(() => {
    db.flushdb();
  });

  describe("Create", () => {
    /**
     * Test case: Create a new user.
     * Verifies that the user creation process completes without errors and returns "OK".
     */
    it("create a new user", (done) => {
      const user = {
        username: "macbucheron",
        firstname: "Nathan",
        lastname: "Deprat",
      };
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null);
        expect(result).to.be.equal("OK");
        done();
      });
    });

    /**
     * Test case: Passing invalid user parameters (no username) for creation.
     * Verifies that an error is returned and the result is null.
     */
    it("passing wrong user parameters (no username)", (done) => {
      const user = {
        firstname: "Nathan",
        lastname: "Deprat",
      };
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null);
        expect(result).to.be.equal(null);
        done();
      });
    });

    /**
     * Test case: Passing invalid user parameters (no firstname) for creation.
     * Verifies that an error is returned and the result is null.
     */ 
    it("passing wrong user parameters (no firstname)", (done) => {
      const user = {
        username: "macbucheron",
        lastname: "Deprat",
      };
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null);
        expect(result).to.be.equal(null);
        done();
      });
    });

    /**
     * Test case: Passing invalid user parameters (no lastname) for creation.
     * Verifies that an error is returned and the result is null.
     */
    it("passing wrong user parameters (no lastname)", (done) => {
      const user = {
        username: "macbucheron",
        firstname: "Nathan",
      };
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null);
        expect(result).to.be.equal(null);
        done();
      });
    });


    /**
     * Test case: Avoid creating a user that already exists.
     * Verifies that attempting to create a duplicate user returns an error and a null result.
     */
    it("avoid creating an existing user", (done) => {
      const user = {
        username: "macbucheron",
        firstname: "Nathan",
        lastname: "Deprat",
      };
      // Create a user
      userController.create(user, () => {
        // Attempt to create the same user again
        userController.create(user, (err, result) => {
          expect(err).to.not.be.equal(null);
          expect(result).to.be.equal(null);
          done();
        });
      });
    });
  });

  describe("Get", () => {
    /**
     * Test case: Retrieve an existing user by username.
     * Verifies that the retrieved user matches the expected data.
     */
    it("get a user by username", (done) => {
      const user = {
        username: "macbucheron",
        firstname: "Nathan",
        lastname: "Deprat",
      };
      // Create a user
      userController.create(user, () => {
        // Retrieve the user
        userController.get(user.username, (err, result) => {
          expect(err).to.be.equal(null);
          expect(result).to.be.deep.equal({
            firstname: "Nathan",
            lastname: "Deprat",
          });
          done();
        });
      });
    });

    /**
     * Test case: Attempt to retrieve a non-existent user.
     * Verifies that an error is returned and the result is null.
     */
    it("can not get a user when it does not exist", (done) => {
      userController.get("invalid", (err, result) => {
        expect(err).to.not.be.equal(null);
        expect(result).to.be.equal(null);
        done();
      });
    });

    /**
     * Test case: Passing an invalid username for retrieval.
     * Verifies that an error is returned and the result is null.
     */
    it("passing wrong username", (done) => {
      userController.get(null, (err, result) => {
        expect(err).to.not.be.equal(null);
        expect(result).to.be.equal(null);
        done();
      });
    });
  });

  describe("Update", () => {
    /**
     * Test case: Update an existing user.
     * Verifies that the user's data is successfully updated and matches the new values.
     */
    it("update an existing user", (done) => {
      const user = {
        username: "macbucheron",
        firstname: "Nathan",
        lastname: "Deprat",
      };
      const updatedUser = {
        username: "macbucheron",
        firstname: "Ibrahim",
        lastname: "Diallo",
      };
      // Create a user
      userController.create(user, () => {
        // Update the user
        userController.update(updatedUser, (err, result) => {
          expect(err).to.be.equal(null);
          expect(result).to.be.equal("OK");
          // Verify the updated data
          userController.get(user.username, (err, result) => {
            expect(err).to.be.equal(null);
            expect(result).to.be.deep.equal({
              firstname: "Ibrahim",
              lastname: "Diallo",
            });
            done();
          });
        });
      });
    });

    /**
     * Test case: Passing invalid user parameters (no username) for update.
     * Verifies that an error is returned and the result is null.
     */
    it("passing wrong user parameters for update (no username", (done) => {
      const user = {
        username: "macbucheron",
        firstname: "Nathan",
        lastname: "Deprat",
      };
      const updatedUser = {
        firstname: "Ibrahim",
        lastname: "Diallo",
      };
      // Create a user
      userController.create(user, () => {
        // Attempt to update with missing username
        userController.update(updatedUser, (err, result) => {
          expect(err).to.not.be.equal(null);
          expect(result).to.be.equal(null);
          done();
        });
      });
    });

    /**
     * Test case: Passing invalid user parameters (no firstname) for update.
     * Verifies that an error is returned and the result is null.
     */
    it("passing wrong user parameters for update (no firstname)", (done) => {
      const user = {
        username: "macbucheron",
        firstname: "Nathan",
        lastname: "Deprat",
      };
      const updatedUser = {
        username: "macbucheron",
        lastname: "Diallo",
      };
      // Create a user
      userController.create(user, () => {
        // Attempt to update with missing firstname
        userController.update(updatedUser, (err, result) => {
          expect(err).to.not.be.equal(null);
          expect(result).to.be.equal(null);
          done();
        });
      });
    });

    /**
     * Test case: Passing invalid user parameters (no lastname) for update.
     * Verifies that an error is returned and the result is null.
     */
    it("passing wrong user parameters for update (no lastname)", (done) => {
      const user = {
        username: "macbucheron",
        firstname: "Nathan",
        lastname: "Deprat",
      };
      const updatedUser = {
        username: "macbucheron",
        firstname: "Ibrahim",
      };
      // Create a user
      userController.create(user, () => {
        // Attempt to update with missing lastname
        userController.update(updatedUser, (err, result) => {
          expect(err).to.not.be.equal(null);
          expect(result).to.be.equal(null);
          done();
        });
      });
    });

    /**
     * Test case: Attempt to update a non-existent user.
     * Verifies that an error is returned and the result is null.
     */
    it("can not update a user when it does not exist", (done) => {
      const user = {
        username: "nonexistent",
        firstname: "Non",
        lastname: "Existent",
      };
      userController.update(user, (err, result) => {
        expect(err).to.not.be.equal(null);
        expect(result).to.be.equal(null);
        done();
      });
    });
  });

  describe("Delete", () => {
    /**
     * Test case: Delete an existing user.
     * Verifies that the user is successfully deleted and cannot be retrieved.
     */
    it("deleting an existing user", (done) => {
      const user = {
        username: "macbucheron",
        firstname: "Nathan",
        lastname: "Deprat",
      };
      // Create a user
      userController.create(user, () => {
        // Delete the user
        userController.delete(user.username, (err, result) => {
          expect(err).to.be.equal(null);
          expect(result).to.be.equal(1);
          // Verify the deletion
          userController.get(user.username, (err, result) => {
            expect(err).to.not.be.equal(null);
            expect(result).to.be.equal(null);
            done();
          });
        });
      });
    });

    /**
     * Test case: Attempt to delete a non-existent user.
     * Verifies that an error is returned and the result is null.
     */
    it("can not delete a non existing user", (done) => {
      userController.delete("nonexistent", (err, result) => {
        expect(err).to.not.be.equal(null);
        expect(result).to.be.equal(null);
        done();
      });
    });

    /**
     * Test case: Passing no username for deletion.
     * Verifies that an error is returned and the result is null.
     */
    it("passing no username for delete", (done) => {
      userController.delete(null, (err, result) => {
        expect(err).to.not.be.equal(null);
        expect(result).to.be.equal(null);
        done();
      });
    });
  });
});
