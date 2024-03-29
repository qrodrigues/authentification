import './RegisterPage.scss'
import { Link } from "react-router-dom";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import instanceAxios from '../../helpers/axiosInstance';
import { useUser } from '../../providers/UserContext';

function App() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  const { user, setUser } = useUser();
  if(user){
    navigate('/')
  }
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inputs.password || !inputs.confirmPassword || !inputs.username || !inputs.mail) {
      alert('Tous les champs sont obligatoires');
    } else if (inputs.password !== inputs.confirmPassword) {
      alert('La confirmation de mot de passe ne correspond pas.');
    } else {
      try {
        await instanceAxios.post('http://localhost:3000/account/create', {
          username: inputs.username,
          mail: inputs.mail,
          password: inputs.password
        }).then(() => {
          navigate('/login');
        })
      } catch {
        alert('Une erreur est survenue lors de l\'inscription');
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
      <div className="register-page">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h1>Formulaire d&apos;inscription</h1>
            <div className="socials">
              <div className='google' onClick={clickGoogle}>
                <i className="fa-brands fa-google"></i>
                <span>S&apos;inscrire avec Google</span>
              </div>
              <div className='github' onClick={clickGithub}>
                <i className="fa-brands fa-github"></i>
                <span>S&apos;inscrire avec Github</span>
              </div>
            </div>
            <input name="username" type="text" value={inputs.username || ""} onChange={handleChange} placeholder="Nom d'utilisateur" />
            <input name="mail" type="text" value={inputs.mail || ""} onChange={handleChange} placeholder="Adresse email" />
            <input name="password" value={inputs.password || ""} onChange={handleChange} type="password" placeholder="Mot de passe" />
            <input name="confirmPassword" type="password" value={inputs.confirmPassword || ""} onChange={handleChange} placeholder="Confirmation de mot de passe" />
            <input type="submit" className="button" value="S'inscrire" />
            <h5>Déjà un compte ?<Link to="/login"> Connectez-vous</Link></h5>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
