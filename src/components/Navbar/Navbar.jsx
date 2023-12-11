import { Link } from "react-router-dom";
import './Navbar.css'
import Account from "./Account/Account";

function Navbar() {
    return (
        <div className="navbar">
            <Link to="/">
                <img className="logo" src="logo_blog.png" alt="" />
            </Link>
           <Account />
        </div>
      )
}

export default Navbar
