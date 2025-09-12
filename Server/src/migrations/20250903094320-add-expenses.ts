import { Db } from "mongodb";

module.exports = {
  /**
   * @param db {import('mongodb').Db}
   * @param client {import('mongodb').MongoClient}
   * @returns {Promise<void>}
   */
  async up(db: Db) {
    await db.createCollection("expenses", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["date", "category", "amount"],
          properties: {
            owner: {
              bsonType: "objectId",
            },
            date: {
              bsonType: "date",
            },
            category: {
              bsonType: "string",
            },
            amount: {
              bsonType: "number",
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
    await db.collection("expenses").drop();
  },
};
