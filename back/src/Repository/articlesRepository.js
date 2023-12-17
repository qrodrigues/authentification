const { MongoClient, ObjectId, Long } = require("mongodb");

async function getArticles() {
    const client = new MongoClient(process.env.MONGO_URI);
    try {
        // get mongo collection
        await client.connect();
        const database = client.db(process.env.MONGO_DB);
        const articles = database.collection('articles');

        // get all articles
        const results = await articles.find().toArray();

        if (results) {
            return results;
        } else {
            return null;
        }
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

async function getOneArticle(article_id) {
    const client = new MongoClient(process.env.MONGO_URI);
    try {
        // get mongo collection
        await client.connect();
        const database = client.db(process.env.MONGO_DB);
        const articles = database.collection('articles');

        // get a specific article
        const result = await articles.findOne({ _id: new ObjectId(article_id) });
        if (result) {
            return result;
        } else {
            return null;
        }
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

async function getArticlesByBlog(blog_id) {
    const client = new MongoClient(process.env.MONGO_URI);
    try {
        // get mongo collection
        await client.connect();
        const database = client.db(process.env.MONGO_DB);
        const articles = database.collection('articles');

        // get a specific article
        const results = await articles.find({ blog_id: new ObjectId(blog_id) }).toArray();;

        if (results) {
            return results;
        } else {
            return null;
        }
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

async function createArticle(title, content, blog_id) {
    const client = new MongoClient(process.env.MONGO_URI);
    try {
        // get mongo collection
        await client.connect();
        const database = client.db(process.env.MONGO_DB);
        const articles = database.collection('articles');
        // Add a new article in mongo
        const result = await articles.insertOne(
            { title, content, blog_id: new ObjectId(blog_id) }
        );
        if (result) { // Check if created
            return result.insertedId;
        } else {
            return null; // Article not added
        }
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

async function updateArticle(article_id, title, content) {
    const client = new MongoClient(process.env.MONGO_URI);
    try {
        // get mongo collection
        await client.connect();
        const database = client.db(process.env.MONGO_DB);
        const articles = database.collection('articles');

        // update specific article
        const result = await articles.updateOne(
            { _id: new ObjectId(article_id) },
            { $set: { title: title, content: content } }
        );

        if (result.modifiedCount > 0) {  // Check if updated
            return result
        } else {
            return null;
        }
    } finally {
        await client.close();
    }
}

async function deleteArticle(article_id) {
    const client = new MongoClient(process.env.MONGO_URI);
    try {
        // get mongo collection
        await client.connect();
        const database = client.db(process.env.MONGO_DB);
        const articles = database.collection('articles');

        // delete a specific article 
        const result = await articles.deleteOne({ _id: new ObjectId(article_id) });
        if (result.deletedCount > 0) { // Check if deleted
            return article_id
        } else {
            return null;
        }
    } finally {
        await client.close();
    }
}

async function limitArticle(limit) {
    const client = new MongoClient(process.env.MONGO_URI);
    try {
        // get mongo collection
        await client.connect();
        const database = client.db(process.env.MONGO_DB);
        const articles = database.collection('articles');
        // selected a limited amount of article
        const result = await articles.find().sort({ _id: -1 }).limit(limit).toArray();
        return result;
    } finally {
        await client.close();
    }
}


module.exports = { getArticles, getOneArticle, getArticlesByBlog, createArticle, updateArticle, deleteArticle, limitArticle }