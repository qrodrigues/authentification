import { Link } from "react-router-dom";
import './Navbar.scss'
import Account from "./Account/Account";

function Navbar() {

    return (
        <div className="navbar">
            <Link to="/">
                <img className="logo" src="/logo.png" alt="" />
            </Link>
           <Account />
        </div>
      )
}

export default Navbar
