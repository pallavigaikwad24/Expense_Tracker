import type { Db } from "mongodb";

module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @returns {Promise<void>}
   */
  async up(db: Db) {

    await db.createCollection("users", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name", "email", "password"],
          properties: {
            name: {
              bsonType: "string",
              description: "must be a string and is required",
            },
            email: {
              bsonType: "string",
              description: "Please enter a valid email address",
            },
            password: {
              bsonType: "string",
              minLength: 6,
              description:
                "must be a string with minimum length 6 and is required",
            },
            createAt: {
              bsonType: "date",
            },
          },
        },
      },
    });
  },

  /**
   * @param db {import('mongodb').Db}
   * @returns {Promise<void>}
   */
  async down(db: Db) {
    await db.collection("users").drop();
  },
};
