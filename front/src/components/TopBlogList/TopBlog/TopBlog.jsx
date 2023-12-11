import './TopBlog.scss'
import { Link } from "react-router-dom";

function TopBlog(props) {

    return (
      <>   
        <Link to={`${props.article.link}`} className="top_blog_item">
                <h3>{props.article.title}</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
        </Link>
      </>
    )
  }
  
  export default TopBlog
