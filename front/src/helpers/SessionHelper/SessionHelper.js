import instanceAxios from '../axiosInstance';

async function checkSession() {
    try {
        const response = await instanceAxios.post('http://localhost:3000/account/login');
        console.log(response.data)
        return response.data

    } catch (error) {
        console.log(error)
        return error
    }
}

export default { checkSession }