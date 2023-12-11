import './RegisterPage.scss'
import { Link } from "react-router-dom";
import { useState } from 'react'

function App() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputs.password != inputs.confirmPassword) alert('La confirmation de mot de passe ne correspond pas.')
  }

  return (
    <>
      <div className="register-page">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h1>Formulaire d'inscription</h1>
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
