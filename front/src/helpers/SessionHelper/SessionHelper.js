import axios from 'axios'
axios.defaults.withCredentials = true

async function checkSession() {
    try {
        const response = await axios.get('http://localhost:3000/account/verify', { withCredentials: true });
        console.log(response.data)
        return response.data

    } catch (error) {
        console.log(error)
        return error
    }

}

export default { checkSession }