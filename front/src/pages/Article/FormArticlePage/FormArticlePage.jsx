import { useState } from 'react'
import "./FormArticlePage.scss"
import ArticleRepository from '../../../repository/ArticleRepository';
import BlogRepository from '../../../repository/BlogRepository';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../providers/UserContext';
import { useEffect } from 'react';

function CreateArticlePage() {
  const [inputs, setInputs] = useState({ title: '', content: '' });
  const { user } = useUser();
  const navigate = useNavigate();
  const { articleid } = useParams();
  if(!user){
    navigate('/')
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs(prevInputs => ({ ...prevInputs, [name]: value }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!inputs.title || !inputs.content) {
      alert('Tous les champs sont obligatoires');
    } else {
      const blog = await BlogRepository.getBlogByUser(user._id)
      if(blog){
        if(articleid){ // if modification
          const article = await ArticleRepository.updateArticle(articleid, inputs.title, inputs.content)
          if(article){
            navigate("/dashboard");
          }
        } else { // if creation
          const article = await ArticleRepository.createArticle(blog._id, inputs.title, inputs.content)
          if(article){
            navigate("/dashboard");
          }
        }
      }
    }
  }

  useEffect(() => {
    const fetchArticle = async () => {
      if (user && articleid) {
        try {
            const article = await ArticleRepository.getArticle(articleid)
            setInputs({ title: article.title, content: article.content })
        } catch (error) {
          console.error("error");
        }
      }
    }
    fetchArticle()
  }, [articleid,user])


  return (
    <div className="create-article-page">
      <div className="container">
        {articleid ?
        <form className="create-form" method="POST" onSubmit={handleSubmit} action="">
          <h1>Modifier l'article<i className="fa-solid fa-pencil"></i></h1>
          <input name="title" type="text" placeholder="Chargement du titre..." value={inputs.title} onChange={handleChange} />
          <textarea name="content" rows="10" cols="33" type="text" placeholder="Chargement de la description..." value={inputs.content} onChange={handleChange} required />
          <input type="submit" className="button" value="Modifier" required />
        </form>
        :
        <form className="create-form" method="POST" onSubmit={handleSubmit} action="">
          <h1>Créer un article <i className="fa-solid fa-pencil"></i></h1>
          <input name="title" type="text" placeholder="Titre" value={inputs.title} onChange={handleChange} />
          <textarea name="content" rows="10" cols="33" type="text" placeholder="Description" value={inputs.content} onChange={handleChange} required />
          <input type="submit" className="button" value="Confirmer" required />
        </form>
}
      </div>
    </div>
  );
}
  
  export default CreateArticlePage