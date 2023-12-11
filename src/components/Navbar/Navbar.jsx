import { Link } from "react-router-dom";
import './Navbar.css'
import Account from "./Account/Account";

function Navbar() {

    // const user = {
    //     username : "Mosca",
    //     name:"Rodrigues",
    //     lastname:"Anthony",
    //     email : "XXXXXXXXXXXXXXX"
    // }
    const user = null

    return (
        <div className="navbar">
            <Link to="/">
                <img className="logo" src="logo_blog.png" alt="" />
            </Link>
           <Account user={user} />
        </div>
      )
}

export default Navbar
