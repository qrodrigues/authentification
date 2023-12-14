import instanceAxios from '../helpers/axiosInstance'


async function getBlogs(){
    try {
        const response = await instanceAxios.get('http://localhost:3000/blog');
        console.log(response);
        return response.data;

    } catch (error) {
        console.log(error)
        return error
    }

}

async function getBlog(id){
    try {
        const response = await instanceAxios.get(`http://localhost:3000/blog/${id}`);
        console.log(response);
        return response.data;

    } catch (error) {
        console.log(error)
        return error
    }

}

export default {getBlogs, getBlog};