import './ArticlesCard.scss'

function ArticleCard(props) {

    return (
        <div className="article_card">
            <div className="article">
                <h3>{props.article.title}</h3>
                <p>{props.article.content}</p>
            </div>
            <div className="article-actions">
                <i className="fa-solid fa-pencil"></i>
                <i  className="fa-solid fa-trash"></i>
            </div>
        </div>
        )
    }

export default ArticleCard