import "./ShowBlog.scss";
import ArticleCard from "../../components/ArticleCard/ArticleCard.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import { Link } from "react-router-dom";
import instanceAxios from "../../helpers/axiosInstance.js";
import { useEffect, useState } from "react";
import BlogRepository from "../../repository/BlogRepository.js";
import { useUser } from "../../providers/UserContext";
import { useNavigate } from "react-router-dom";
import ArticleRepository from "../../repository/ArticleRepository.js";

function ShowBlog() {
  const [blog, setBlog] = useState(null)
  const { user } = useUser();
  const [articles, setArticle] = useState(null)
  // console.log('user:', user);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchBlogAndArticles = async () => {
      if (user) {
        try {
          const blog = await BlogRepository.getBlogByUser(user._id)
          setBlog(blog)
          console.log(blog._id);
          if(blog) {
            const articles = await ArticleRepository.getArticleByBlog(blog._id)
            setArticle(articles)
          }
        } catch (error) {
          setBlog(null)
        }
      }
    }
    fetchBlogAndArticles()
  }, [user])

  const enableExtraAuth = async () => {
    navigate('/dashboard/a2f')
  }

  const disableExtraAuth = async () => {
    await instanceAxios.get(`http://localhost:3000/account/a2f/disable?user=${user._id}`).then(() => {
      navigate(0)
    })
  }

  return (
    <>
      <div className="container">
        <h1>Votre espace personnel :</h1>
        <h2>Votre profil</h2>
        <div className="button-config">
          {user && !user.a2f && (
            <button className="config-btn a2f" onClick={enableExtraAuth}>Activer l&apos;authentification à deux facteurs</button>
          )}
          {user && user.a2f && (
            <>
              <button className="config-btn a2f-disable" onClick={disableExtraAuth}>Désactiver l&apos;authentification à deux facteurs<i className="fa-solid fa-triangle-exclamation"></i></button>
            </>
          )}
          <button className="config-btn disconnect">Déconnecter toutes les sessions</button>
        </div>
        <h2>Gérer votre blog</h2>
        <div className="user-area">
          <div className="user-action">
            <Link className="create-btn" to="/dashboard/new">
              Créer un article<i className="fa-solid fa-plus"></i>
            </Link>
          </div>
        </div>
        <div className="article-grid">

          {blog ?
              articles ?
              articles.map((article, index) => (
                <ArticleCard article={article} key={index} />
              ))
              : 
              <h1><Loader /></h1>
            :
            <h1><Loader /></h1>
          }
        </div>
      </div>
    </>
  );
}

export default ShowBlog;
