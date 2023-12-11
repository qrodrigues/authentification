import { Link } from "react-router-dom";
import './Navbar.css'

function App() {
    return (
        <div className="flex mt-4 gap-x-8">
            <Link to="/home">Accueil</Link>
            <Link to="/register">S'inscrire</Link>
            <Link to="/login">Se connecter</Link>
            <Link to="/dashboard">Dashboard</Link>
        </div>
      )
}

export default App
