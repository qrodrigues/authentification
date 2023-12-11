import { Link } from "react-router-dom";

function Account(props) {
    return (
        <div>
            <Link className="nav_links" to="/">
                {props.user.isLoggedIn ? props.user.username : "Se connecter"}
                <i class="fa-regular fa-user"></i>
            </Link>
           
        </div>
      )
}

export default Account
