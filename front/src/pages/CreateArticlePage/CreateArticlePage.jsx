import { useState } from 'react'
import "./CreateArticlePage.scss"

function CreateArticlePage() {
  const [inputs, setInputs] = useState({ title: '', content: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // const { title, content } = inputs;

    if (!inputs.title || !inputs.content) {
      alert('Tous les champs sont obligatoires');
    } else {
      console.log(inputs);

      // Ajoutez ici la logique pour soumettre les données (par exemple, appel API)
    }
  }

  return (
    <div className="create-article-page">
      <div className="container">
        <form className="create-form" method="POST" onSubmit={handleSubmit} action="">
          <h1>Créer un article <i className="fa-solid fa-pencil"></i></h1>
          <input name="title" type="text" placeholder="Titre" value={inputs.title} onChange={handleChange} />
          <input name="content" type="text" placeholder="Description" value={inputs.content} onChange={handleChange} required />
          <input type="submit" className="button" value="Confirmer" required />
        </form>
      </div>
    </div>
  );
}
  
  export default CreateArticlePage