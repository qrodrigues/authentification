import axios from 'axios'

async function checkSession(){
    try{
        const response = await axios.post('http://localhost:3000/account/verify')
        console.log(response.data)
        return response.data
    
    } catch (error){
        console.log(error)
        return error
    }
   
}

export default { checkSession }