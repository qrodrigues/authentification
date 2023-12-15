const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb+srv://quentinrodrigues:nel5QwlsEArsZTMS@cluster0.bjhioln.mongodb.net/";

async function createArticle(blog_id, title, content) {
    const client = new MongoClient(uri);
    try {
      const database = client.db('livecampus-authentication');
      const blogs = database.collection('blogs');
      const blog = await blogs.findOne({ _id : new ObjectId(blog_id)  })
      if (blog === null) {
        console.log(blog);
        // const insertArticle = await blogs.insertOne({ title, description, link, arti});

        return insertBlog.insertedId;
      } else {
        return null;
      }
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

module.exports = { createArticle}