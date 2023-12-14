import { Link } from "react-router-dom";
import { useUser } from "../../../providers/UserContext";


function Account() {
    const { user, setUser } = useUser();

    const logout = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setUser(null)
    }
    return (
        <div>
            {user ? 
                <div className="nav_links_btns">
                    <Link className="nav_links" to="/dashboard">
                    <span>{user.username}</span>
                    <i className="fa-regular fa-user"></i>
                    </Link>
                    <Link className="nav_links logout" onClick={logout}>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    </Link>
                </div>
                :
                <div className="nav_links_btns">
                    <Link className="nav_links" to="/login">
                    <span>Se connecter</span>
                    <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                </div>
            }

           
        </div>
      )
}

export default Account
