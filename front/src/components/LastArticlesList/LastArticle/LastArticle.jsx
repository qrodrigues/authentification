import './TopArticle.scss'
import { Link } from "react-router-dom";

function TopBlog(props) {

    return (
      <>   
        <Link to={`${props.article.link}`} className="top_blog_item">
                <h3>{props.article.title}</h3>
                <p>{props.article.content}</p>
        </Link>
      </>
    )
  }
    
  export default TopBlog
