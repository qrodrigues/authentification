const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require('bcrypt');
// Replace the uri string with your connection string.
const uri = "mongodb+srv://quentinrodrigues:nel5QwlsEArsZTMS@cluster0.bjhioln.mongodb.net/";
const {createBlog} = require("./blogsRepository");

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
    const user = await users.findOne({ mail })
    if (user === null) {
      const insertUser = await users.insertOne({ username, mail, password: hashedPassword, a2f: {active: false, secret: 'unsecretvraimenttressecret'} });
      const blog_info = {
        "title": `Blog de ${username}`,
        "description": `Ceci est le premier blog de ${username} `,
        "author_id": insertUser.insertedId,
        "status": "private"
      }
      await createBlog(blog_info.title, blog_info.description, blog_info.author_id, blog_info.status)
      return insertUser.insertedId
    } else {
      return null
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function checkPassword(mail, password) {
  const client = new MongoClient(uri);
  try {
    const database = client.db('livecampus-authentication');
    const users = database.collection('users');
    const user = await users.findOne({ mail })
    if (user === null) {
      return null
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) return {
        _id: user._id,
        username: user.username,
        a2f: user.a2f.active
      }
      return null
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function createProviderUser(username, providerId, provider) {
  const client = new MongoClient(uri);
  try {
    const database = client.db('livecampus-authentication');
    const users = database.collection('users');
    const user = await users.findOne({ provider, providerId })
    if (user === null) {
      const insertUser = await users.insertOne({ username, provider, providerId, a2f: {active: false, secret: 'unsecretvraimenttressecret'} });
      const blog_info = {
        "title": `Blog de ${username}`,
        "description": `Ceci est le premier blog de ${username} `,
        "author_id": insertUser.insertedId,
        "status": "private"
      }
      await createBlog(blog_info.title, blog_info.description, blog_info.author_id, blog_info.status)
      return insertUser.insertedId
    } else {
      return null
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function getUserByProviderId (provider, id) {
  const client = new MongoClient(uri);
  try {
    const database = client.db('livecampus-authentication');
    const users = database.collection('users');
    const user = await users.findOne({ provider, providerId: id })
    if (user) return user
    return null
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function getUserById (id) {
  const client = new MongoClient(uri);
  try {
    const database = client.db('livecampus-authentication');
    const users = database.collection('users');
    const user = await users.findOne({ _id: new ObjectId(id) })
    if (user) return user
    return null
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function updateUser (id, userData) {
  const client = new MongoClient(uri);
  try {
    const database = client.db('livecampus-authentication');
    const users = database.collection('users');
    const user = await users.updateOne({_id: id}, {$set: userData })
    if (user) return user
    return null
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

module.exports = { createUser, checkPassword, createProviderUser, getUserByProviderId, getUserById, updateUser }