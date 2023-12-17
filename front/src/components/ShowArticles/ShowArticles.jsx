import "./ShowArticles.scss";
import ArticleCard from "../../components/ArticleCard/ArticleCard.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import { Link } from "react-router-dom";

function ShowArticles (props) {
    const articles = props.articles
    const isAuthor = props.canEdit
  
    return (
      <>
        <div className="container">
          <div className="user-area">
            <div className="user-action">
                {isAuthor && (
                    <Link className="create-btn" to="/dashboard/new">
                        Créer un article<i className="fa-solid fa-plus"></i>
                    </Link>
                )}
            </div>
          </div>
          <div className="article-grid">
  
            {articles ?
                articles.map((article, index) => (
                  <ArticleCard article={article} canEdit={isAuthor} key={index} />
                ))
                : 
                <h1><Loader /></h1>
            }
          </div>
        </div>
      </>
    );
  }


export default ShowArticles