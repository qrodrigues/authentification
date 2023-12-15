const { MongoClient, ObjectId } = require("mongodb");
const uri = "mongodb+srv://quentinrodrigues:nel5QwlsEArsZTMS@cluster0.bjhioln.mongodb.net/";

async function getSingleBlog(blogId) {
  const client = new MongoClient(uri);
  try {
    const database = client.db('livecampus-authentication');
    const blogs = database.collection('blogs');
    const blog = await blogs.findOne({ _id: new ObjectId(blogId) });
    if (blog === null) {
      return null;
    } else {
      return blog;
    }
  } finally {
    await client.close();
  }
}

async function getBlogs() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();

    const database = client.db('livecampus-authentication');
    const blogs = database.collection('blogs');
    const users = database.collection('users');

    const blogList = await blogs.find().toArray();

    if (!blogList || blogList.length === 0) {
      return null;
    }
    const updated_blogs = await Promise.all(blogList.map(async (blog) => {
      const user = await users.findOne({ _id: new ObjectId(blog.author_id) });
      blog.author_name = user?._id ? user.username : 'Auteur inconnu';
  
      return blog;
    }));
    return updated_blogs
  } finally {
    await client.close();
  }
}

async function createBlog(title, description, articles, author_id, status) {
  const client = new MongoClient(uri);
  try {
    const database = client.db('livecampus-authentication');
    const blogs = database.collection('blogs');
      const insertBlog = await blogs.insertOne({ title, description, articles, author_id : new ObjectId(author_id), status });
      return insertBlog.insertedId;
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

async function getSingleBlogByUser(user_id){
  const client = new MongoClient(uri);
  try {
    const database = client.db('livecampus-authentication');
    const blogs = database.collection('blogs');
    const users = database.collection('users');
    const blog = await blogs.findOne({ author_id: new ObjectId(user_id) });
    console.log("blog : ",blog); 
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

module.exports = { getSingleBlog, getBlogs, createBlog, updateBlog, deleteBlog, getSingleBlogByUser}