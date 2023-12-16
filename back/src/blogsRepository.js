const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb+srv://quentinrodrigues:nel5QwlsEArsZTMS@cluster0.bjhioln.mongodb.net/";
const {createArticle} = require("./articlesRepository");

async function getBlogs() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // get mongo collection
    await client.connect();
    const database = client.db('livecampus-authentication');
    const blogs = database.collection('blogs');

    const blogList = await blogs.find().toArray();
    return blogList
  } finally {
    await client.close();
  }
}

async function getOneBlog(blogId) {
  const client = new MongoClient(uri);
  try {
    // get mongo collection
    await client.connect();
    const database = client.db('livecampus-authentication');
    const blogs = database.collection('blogs');
    const result = await blogs.findOne({ _id: new ObjectId(blogId) });
    return result
  } finally {
    await client.close();
  }
}

async function createBlog(title, description, author_id, status) {
  const client = new MongoClient(uri);
  try {
    // get mongo collection
    await client.connect();
    const database = client.db('livecampus-authentication');
    const blogs = database.collection('blogs');
    const insertBlog = await blogs.insertOne({ title, description, articles : [], author_id: new ObjectId(author_id), status });
    if (insertBlog) {
      const createdArticle = await createArticle("Le premier article", "Vous pouvez modifier le contenu de cet article à tout moment", insertBlog.insertedId)
      await updateBlog(insertBlog.insertedId, { articles : [createdArticle] })
      return insertBlog.insertedId;
    } else {
      return null
    }

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function updateBlog(blogId, updateFields) {
  const client = new MongoClient(uri);
  try {
    const database = client.db('livecampus-authentication');
    const blogs = database.collection('blogs');
    const blog = await blogs.findOne({ _id: new ObjectId(blogId) })
    if (blog === null) {
      return null
    } else {
      const updateResult = await blogs.updateOne(
        { _id: new ObjectId(blogId) },
        { $set: updateFields });

      if (updateResult.modifiedCount > 0) {
        return blogId;
      } else {
        return null;
      }
    }
  } finally {
    await client.close();
  }
}

async function deleteBlog(blogId) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('livecampus-authentication');
    const blogs = database.collection('blogs');
    const existingBlog = await blogs.findOne({ _id: new ObjectId(blogId) });
    if (existingBlog == null) {
      return null;
    } else {
      const deleteResult = await blogs.deleteOne({ _id: new ObjectId(blogId) });
      if (deleteResult.deletedCount > 0) {
        return blogId;
      } else {
        return null;
      }
    }
  } finally {
    await client.close();
  }
}

async function getSingleBlogByUser(user_id) {
  const client = new MongoClient(uri);
  try {
    const database = client.db('livecampus-authentication');
    const blogs = database.collection('blogs');
    const users = database.collection('users');
    const blog = await blogs.findOne({ author_id: new ObjectId(user_id) });
    if (blog == null) {
      return null;
    } else {
      const user = await users.findOne({ _id: new ObjectId(blog.author_id) });
      blog.author_name = user?._id ? user.username : 'Auteur inconnu';
      return blog;
    }
  } finally {
    await client.close();
  }
}
module.exports = { getBlogs, getOneBlog, createBlog, updateBlog, deleteBlog, getSingleBlogByUser }