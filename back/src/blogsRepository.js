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
  const client = new MongoClient(uri);
  try {
    const database = client.db('livecampus-authentication');
    const blogs = database.collection('blogs');
    const blogList = await blogs.find().toArray();
    if(blogList) {
      return blogList;
    } else {
      return null;
    }
  }
  finally {
    await client.close();
  }
}

async function createBlog(title, description, link, articles, author, status) {
  const client = new MongoClient(uri);
  try {
    const database = client.db('livecampus-authentication');
    const blogs = database.collection('blogs');
    const blog = await blogs.findOne({ title })
    if (blog === null) {
      const insertBlog = await blogs.insertOne({ title, description, link, articles, author, status });
      return insertBlog.insertedId;
    } else {
      return null;
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
    console.log("existingBlog :",existingBlog);
    if (existingBlog == null) {
      console.log("existe po");
      return null;
    } else {
      const deleteResult = await blogs.deleteOne({ _id: new ObjectId(blogId) });
      console.log("delete :",deleteResult);
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

async function getSingleBlogByUser(username){
  const client = new MongoClient(uri);
  try {
    const database = client.db('livecampus-authentication');
    const blogs = database.collection('blogs');
    const blog = await blogs.findOne({ author: username });
    if (blog == null) {
      return null;
    } else {
      return blog;
    }
  } finally {
    await client.close();
  }
}

module.exports = { getSingleBlog, getBlogs, createBlog, updateBlog, deleteBlog, getSingleBlogByUser}