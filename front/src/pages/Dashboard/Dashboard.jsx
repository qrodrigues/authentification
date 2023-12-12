import ShowBlog from '../../components/ShowBlog/ShowBlog.jsx'
import './Dashboard.scss'
function App(props) {
    
  return (
    
    <>
      <div className="container">
      <h1>Votre espace personnel</h1>
      <div className="user-area">
          <h3>{props.blog.author}</h3>
          <div className="user-action">
            <a className="create-btn" href="#">Créer un article<i className="fa-solid fa-plus"></i></a>
          </div>
        </div>
        <div className="article-grid">
          {props.blog.articles.map((article, index) => (
            <div className="article" key={index}>
              <ShowBlog article={article}/>
              <div className="article-action"><i className="fa-solid fa-ellipsis-vertical"></i></div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
