const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require('bcrypt');
// Replace the uri string with your connection string.
const uri = "mongodb+srv://quentinrodrigues:nel5QwlsEArsZTMS@cluster0.bjhioln.mongodb.net/";
const {createBlog} = require("./blogsRepository");

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

async function addA2f() {
  const client = new MongoClient(uri);
  try {
    const database = client.db('livecampus-authentication');
    const usersCollection = database.collection('users');
    const usersList = await usersCollection.find().toArray();

    for (const user of usersList) {
      const randomSecret = generateRandomString(20); // Générer une chaîne aléatoire de 5 caractères
      await usersCollection.updateOne(
        { _id: user._id },
        { $set: { a2f: { active: false, secret: 'unsecretvraimenttressecret' } } } // Mise à jour de a2f avec active: false et secret aléatoire
      );
    }
  } finally {
    await client.close();
  }
}

addA2f()