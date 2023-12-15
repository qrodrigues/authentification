import './BlogCard.scss'
import { Link } from "react-router-dom";
import { useUser } from '../../../providers/UserContext';


function BlogCard(props) {
    const { user } = useUser();
    return (
      <>   
        <Link to={`/blog/${props.blog._id}`} className={`blog_card_info ${props.blog.status === 'private' ? 'private' : 'public'}`}>
                <h3>{props.blog.title}</h3>
                <p>{props.blog.description}</p>
                <span className="author"><i className="fa-regular fa-user"></i>{props.blog.author_name}</span>
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
