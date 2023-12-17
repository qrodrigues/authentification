import { useState } from "react"
import instanceAxios from "../../helpers/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import SessionHelper from "../../helpers/SessionHelper";
import { useUser } from "../../providers/UserContext";

function LoginPageDualAuth () {
    const navigate = useNavigate()
    const { user_id } = useParams()
    const [token, setToken] = useState('')
    const { user, setUser } = useUser();
    if(user){
      navigate('/')
    }
    const extractNumbers = (str) => {
        const numberPattern = /\d+/g;
        const numbersOnly = str.match(numberPattern);
        if (numbersOnly) {
          return numbersOnly.join('');
        }
        return '';
      };
      
      const handleTokenChange = (event) => {
        const token = event.target.value;
        const onlyNumbers = extractNumbers(token);
        setToken(onlyNumbers);
      };

    const handleVerify = () => {
        instanceAxios.get(`http://localhost:3000/a2f/login/verify?user=${user_id}&token=${token}`).then(async response => {
            if (response.data.isValid) {
                const resp_user = await SessionHelper.getConnectedUser()
                setUser(resp_user)
                navigate('/dashboard')
            } else {
                alert("Le code n'est pas valide.")
            }
        })
    }

    return (
        <>
            <div className="dualAuthentication">
                <div className="title verification">
                    <h1>Entrez le code de vérification</h1>
                    <p>fournit par l&apos;application à deux facteurs</p>
                </div>
                <div className="code">
                    <input type="text" placeholder="Code à 6 chiffres..." value={token} onChange={handleTokenChange} />
                    <button className="config-btn" onClick={handleVerify}>Se connecter</button>
                </div>
            </div>
        </>
    )
}

export default LoginPageDualAuth