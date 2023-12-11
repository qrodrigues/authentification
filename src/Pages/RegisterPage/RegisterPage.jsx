import './RegisterPage.scss'

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
          </form>
        </div>
      </div>
    </>
  )
}

export default App
