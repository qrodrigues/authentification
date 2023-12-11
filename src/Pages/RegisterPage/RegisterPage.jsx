import './RegisterPage.scss'
import { Link } from "react-router-dom";

function App() {

  return (
    <>
      <div class="register-page">
        <div class="container">
          <form>
            <h1>Formulaire d'inscription</h1>
            <input type="text" placeholder="Nom d'utilisateur" />
            <input type="text" placeholder="Adresse email" />
            <input type="password" placeholder="Mot de passe" />
            <input type="password" placeholder="Confirmation de mot de passe" />
            <a class="button" href="#">S'inscrire</a>
            <h5>Déjà un compte ?<Link to="/login"><a> Connectez-vous</a></Link></h5>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
