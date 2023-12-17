import './TopArticle.scss'

function TopBlog(props) {

    return (
      <>   
        <div className="top_blog_item">
                <h3>{props.article.title}</h3>
                <p>{props.article.content}</p>
        </div>
      </>
    )
  }
    
  export default TopBlog
