import './LoginPage.scss'

function App() {

  return (
    <>
      <div class="card login-page">
        <form>
          <h1>Login Page</h1>
          <input type="text" placeholder="Nom d'utilisateur" />
          <input type="password" placeholder="Mot de passe" />
          <a class="button" href="#">Se connecter</a>
          <p><input class="check" type="checkbox" />Remember me<a class="forget" href="#">Forgot account?</a></p>
          <h5>create account?<a href="#"> Create</a></h5>
        </form>
      </div>
    </>
  )
}

export default App
