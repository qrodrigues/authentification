const { MongoClient } = require("mongodb");
const bcrypt = require('bcrypt');
// Replace the uri string with your connection string.
const uri = "mongodb+srv://quentinrodrigues:nel5QwlsEArsZTMS@cluster0.bjhioln.mongodb.net/";

async function createUser(username, mail, password) {
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });

  const client = new MongoClient(uri);
  try {
    const database = client.db('livecampus-authentication');
    const users = database.collection('users');
    const user = await users.findOne({ username })
    if (user === null) {
      const insertUser = await users.insertOne({ username, mail, password: hashedPassword });
      return insertUser.insertedId
    } else {
      return null
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function checkPassword(username, password) {
  const client = new MongoClient(uri);
  try {
    const database = client.db('livecampus-authentication');
    const users = database.collection('users');
    const user = await users.findOne({ username })
    if (user === null) {
      return null
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) return {
        _id: user._id,
        username: user.username
      }
      return null
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = { createUser, checkPassword }