import './LoginPage.scss'
import { Link } from "react-router-dom";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function App() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inputs.password || !inputs.mail) {
      alert('Tous les champs sont obligatoires');
    } else {
      try {
        await axios.post('http://localhost:3000/account/login', {
          mail: inputs.mail,
          password: inputs.password
        }).then((response) => {
          if (response.data.token) {
            localStorage.setItem("loggedInUser", response.data.token);
          }
          navigate('/');
        })
      } catch {
        alert('Une erreur est survenue lors de la connexion.');
      }
    }
  }

  return (
    <>
      <div className="login-page">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h1>Formulaire de connexion</h1>
            <input name="mail" type="text" value={inputs.mail || ""} onChange={handleChange} placeholder="Adresse email" />
            <input name="password" type="password" value={inputs.password || ""} onChange={handleChange} placeholder="Mot de passe" />
            <input type="submit" className="button" value="Se connecter" />
            <p><input className="check" type="checkbox" />Se souvenir de moi<a className="forget" href="#">Mot de passe oublié ?</a></p>
            <h5>Pas de compte ?<Link to="/register"> Créer un compte</Link></h5>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
