import "./CreateArticlePage.scss"

function CreateArticlePage() {

    return (
      <>
      <div className="create-article-page">
        <div className="container">
          <form className="create-form" method="POST">
            <h1>Créer un article <i className="fa-solid fa-pencil"></i></h1>
            <input name="title" type="text" placeholder="Titre"/>
            <input name="content" type="text" placeholder="Description"/>
            <input type="submit" className="button" value="Confirmer" />
          </form>
        </div>
      </div>
      </>
    )
  }
  
  export default CreateArticlePage