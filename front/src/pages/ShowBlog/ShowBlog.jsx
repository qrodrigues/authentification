import "../../components/ShowArticle/ShowArticle.jsx";
import "./Dashboard.scss";
function ShowBlog(props) {
  return (
    <>
      <div className="container">
        <h1>Votre espace personnel</h1>
        <div className="user-area">
          <h3>{ props?.blog?.author && props.blog.author }</h3>
          <div className="user-action">
            <a className="create-btn" href="#">
              Créer un article<i className="fa-solid fa-plus"></i>
            </a>
          </div>
        </div>
        <div className="article-grid">
          {props.blog.articles.map((article, index) => (
            <div className="article" key={index}>
              <ShowBlog article={article} />
              <div className="article-action">
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </div>
              <i  className="fa-solid fa-trash"></i>
              <i className="fa-solid fa-pencil"></i>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ShowBlog;
