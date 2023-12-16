import instanceAxios from '../helpers/axiosInstance'


async function getArticles() {
    try {
        const response = await instanceAxios.get(`http://localhost:3000/article`);
        return response.data;

    } catch (error) {
        console.log(error)
        return error
    }
}

async function getArticle(articleId) {
    try {
        const response = await instanceAxios.get(`http://localhost:3000/article/${articleId}`);
        console.log(response);
        return response.data;

    } catch (error) {
        console.log(error)
        return error
    }
}

async function getArticleByBlog(blogId) {
    try {
        const response = await instanceAxios.get(`http://localhost:3000/article/blog/${blogId}`);
        return response.data;

    } catch (error) {
        console.log(error)
        return error
    }
}

async function createArticle(blogId, title, content) {
    try {
        const response = await instanceAxios.post(`http://localhost:3000/article`,
            {
                "title": title,
                "content": content,
                "blog_id":blogId
            });
        return response.data;

    } catch (error) {
        console.log(error)
        return error
    }
}

async function updateArticle(articleId, title, content) {
    try {
        const response = await instanceAxios.put(`http://localhost:3000/article/${articleId}`,
            {
                "title": title,
                "content": content
            });
        return response.data;

    } catch (error) {
        console.log(error)
        return error
    }
}

async function deleteArticle(articleId) {
    try {
        const response = await instanceAxios.delete(`http://localhost:3000/article/${articleId}`);
        return response.data;

    } catch (error) {
        console.log(error)
        return error
    }
}

async function getAmountArticles(limit) {
    try {
        const response = await instanceAxios.get(`http://localhost:3000/article/limit/${limit}`);
        return response.data;

    } catch (error) {
        console.log(error)
        return error
    }
}



export default { getArticles, getArticle, getArticleByBlog, createArticle, updateArticle, deleteArticle, getAmountArticles};