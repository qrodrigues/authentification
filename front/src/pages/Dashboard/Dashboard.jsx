import "./Dashboard.scss";
import instanceAxios from "../../helpers/axiosInstance.js";
import { useEffect, useState } from "react";
import BlogRepository from "../../repository/BlogRepository.js";
import { useUser } from "../../providers/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import ArticleRepository from "../../repository/ArticleRepository.js";
import ShowArticles from "../../components/showArticles/ShowArticles.jsx";

function ShowBlog() {
  const { user } = useUser();
  const [articles, setArticle] = useState(null)
  // console.log('user:', user);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchArticles = async () => {
      if (user) {
        try {
          const blog = await BlogRepository.getBlogByUser(user._id)
          if(blog) {
            const articles = await ArticleRepository.getArticleByBlog(blog._id)
            setArticle(articles)
          }
        } catch (error) {
          console.error(error)
        }
      }
    }
    fetchArticles()
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
        <ShowArticles articles={articles} canEdit={true} />
      </div>
    </>
  );
}

export default ShowBlog;
