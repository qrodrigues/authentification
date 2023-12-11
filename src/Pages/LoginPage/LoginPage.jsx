import './LoginPage.scss'
import { Link } from "react-router-dom";

function App() {

  return (
    <>
      <div class="login-page">
        <div class="container">
          <form>
            <h1>Formulaire de connexion</h1>
            <input type="text" placeholder="Nom d'utilisateur" />
            <input type="password" placeholder="Mot de passe" />
            <a class="button" href="#">Se connecter</a>
            <p><input class="check" type="checkbox" />Se souvenir de moi<a class="forget" href="#">Mot de passe oublié ?</a></p>
            <h5>Pas de compte ?<Link to="/register"><a> Créer un compte</a></Link></h5>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
