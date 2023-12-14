import instanceAxios from './axiosInstance';

async function getConnectedUser() {
    try {
        const response = await instanceAxios.get('http://localhost:3000/account/verify');
        return response.data.user;

    } catch (error) {
        console.log(error)
        return error
    }
}

export default { getConnectedUser }