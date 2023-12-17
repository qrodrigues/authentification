import instanceAxios from '../helpers/axiosInstance'


async function getBlogs(){
    try {
        const response = await instanceAxios.get('http://localhost:3000/blog');
        return response.data;

    } catch (error) {
        console.error(error)
        return error
    }

}

async function getBlog(id){
    try {
        const response = await instanceAxios.get(`http://localhost:3000/blog/${id}`);
        return response.data;

    } catch (error) {
        console.error(error)
        return error
    }

}

async function updateBlog(id, title, description, status){
    console.log(id,title,description,status);
    try {
        const response = await instanceAxios.put(`http://localhost:3000/blog/${id}`,{
            title : title,
            description : description,
            status : status,
        });
        return response.data;

    } catch (error) {
        console.error(error)
        return error
    }
}

async function deleteBlog(id){
    try {
        const response = await instanceAxios.delete(`http://localhost:3000/blog/${id}`);
        return response.data;

    } catch (error) {
        console.error(error)
        return error
    }
}

async function getBlogByUser(user_id){
    try {
        const response = await instanceAxios.get(`http://localhost:3000/blog/user/${user_id}`);
        return response.data;

    } catch (error) {
        console.error(error)
        return error
    }
}

export default {getBlogs, getBlog, updateBlog,deleteBlog, getBlogByUser};