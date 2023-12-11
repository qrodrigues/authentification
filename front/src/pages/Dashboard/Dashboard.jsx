function App(props) {
  return (
    
    <>
      <h1>Dashboard</h1>
      <div className="container">
        <div className="user-area">
          <div className="user-label">{props.username}</div>
        </div>
        <div className="user-action">
          <a className="create-btn" href="#">Créer un article </a>
        </div>
        <div className="user-article">
          {articles.map((article, index) => (
            <div className="article" key={index}>
              <h1>{article.title}</h1>
              <p>{article.content}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
