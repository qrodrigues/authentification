function ShowArticle(props) {

    return (
        <div className="blog-area">
            <h3>{props.article.title}</h3>
            <p>{props.article.content}</p>
        </div>
        )
    }

export default ShowArticle