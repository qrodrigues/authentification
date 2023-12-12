const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri = "mongodb+srv://quentinrodrigues:nel5QwlsEArsZTMS@cluster0.bjhioln.mongodb.net/";

async function createUser(username, mail, password) {
  const client = new MongoClient(uri);
  try {
    const database = client.db('livecampus-authentication');
    const users = database.collection('users');
    const user = await users.findOne({ mail })
    if (user === null) {
      const insertUser = await users.insertOne({ username, mail, password });
      console.log(insertUser);
      return insertUser.insertedId
    } else {
      return null
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = { createUser }