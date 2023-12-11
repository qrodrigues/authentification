import { Link } from "react-router-dom";

function Account(props) {
    return (
        <div>
            {props.user ? 
                <Link className="nav_links" to="/dashboard">
                <span>{props.user.username}</span>
                <i className="fa-regular fa-user"></i>
                </Link>
                :
                <Link className="nav_links" to="/login">
                <span>Se connecter</span>
                <i className="fa-solid fa-arrow-right"></i>
                </Link>
            }

           
        </div>
      )
}

export default Account
