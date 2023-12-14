import './BlogCard.scss'
import { Link } from "react-router-dom";
import { useUser } from '../../../providers/UserContext';


function BlogCard(props) {
    const { user } = useUser();
    return (
      <>   
        <Link to={`${props.blog.author == user ? props.blog.link : '/login'}`} className={`blog_card_info ${props.blog.status === 'private' ? 'private' : 'public'}`}>
                <h3>{props.blog.title}</h3>
                <p>{props.blog.description}</p>
                <span className="author"><i className="fa-regular fa-user"></i>{props.blog.author}</span>
                { props.blog.status == 'private' ?
                    <span className="status private"><i className="fa-solid fa-lock"></i></span>
                : 
                    <span className="status public"><i className="fa-regular fa-eye"></i></span>
                }
        </Link>
      </>
    )
  }
    
  export default BlogCard
