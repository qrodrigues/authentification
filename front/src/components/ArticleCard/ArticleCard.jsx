import './ArticlesCard.scss'
import { Link } from 'react-router-dom'
import ArticleRepository  from '../../repository/ArticleRepository'
import { useNavigate } from 'react-router-dom';

function ArticleCard(props) {
    const navigate = useNavigate()
    const isAuhtor = props.canEdit

    const handleDelete = async () => {
        if (props.article) {
            if (window.confirm("Voulez-vous vraiment supprimer cet article ?")) {
                console.log("article supprimé", props.article._id);
                await ArticleRepository.deleteArticle(props.article._id);
                navigate(0)
            }
        }
    };

    return (
        <div className="article_card">
            <div className="article">
                <h3>{props.article.title}</h3>
                <p>{props.article.content}</p>
            </div>
            { isAuhtor && (
            <div className="article-actions">
                <Link to={`/dashboard/update/${props.article._id}`}>
                    <i className="fa-solid fa-pencil"></i>
                </Link>
                <i className="fa-solid fa-trash"onClick={() => handleDelete()}></i>
            </div>
            )}
        </div>
    )
}

export default ArticleCard