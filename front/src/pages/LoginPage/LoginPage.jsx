import './LoginPage.scss'
import { Link } from "react-router-dom";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import instanceAxios from '../../helpers/axiosInstance';
import SessionHelper from '../../helpers/SessionHelper';
import { useUser } from '../../providers/UserContext';

function App() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const { setUser } = useUser();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inputs.password || !inputs.mail) {
      alert('Tous les champs sont obligatoires');
    } else {
      try {
        await instanceAxios.post('http://localhost:3000/auth/login', {
          mail: inputs.mail,
          password: inputs.password
        }).then(async (response) => {
          if (response.data?.redirectTo) {
            const resp_user = await SessionHelper.getConnectedUser()
            setUser(resp_user)
            navigate(response.data.redirectTo);
          }
        })
      } catch {
        alert('Une erreur est survenue lors de la connexion.');
      }
    }
  }

  const clickGoogle = () => {
    window.open("http://localhost:3000/auth/google", "_self")
  }

  const clickGithub = () => {
    window.open("http://localhost:3000/auth/github", "_self")
  }

  return (
    <>
      <div className="login-page">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h1>Formulaire de connexion</h1>
            <div className="socials">
              <div className='google' onClick={clickGoogle}>
                <i className="fa-brands fa-google"></i>
                <span>Se connecter avec Google</span>
              </div>
              <div className='github' onClick={clickGithub}>
                <i className="fa-brands fa-github"></i>
                <span>Se connecter avec Github</span>
              </div>
            </div>
            <input name="mail" type="text" value={inputs.mail || ""} onChange={handleChange} placeholder="Adresse email" />
            <input name="password" type="password" value={inputs.password || ""} onChange={handleChange} placeholder="Mot de passe" />
            <input type="submit" className="button" value="Se connecter" />
            <h5>Pas de compte ?<Link to="/register"> Créer un compte</Link></h5>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
