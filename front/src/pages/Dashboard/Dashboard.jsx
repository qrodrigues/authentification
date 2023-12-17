import "./Dashboard.scss";
import instanceAxios from "../../helpers/axiosInstance.js";
import { useEffect, useState } from "react";
import BlogRepository from "../../repository/BlogRepository.js";
import { useUser } from "../../providers/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import ArticleRepository from "../../repository/ArticleRepository.js";
import ShowArticles from "../../components/showArticles/ShowArticles.jsx";
import Loader from "../../components/Loader/Loader.jsx";

function ShowBlog() {
  const { user } = useUser();
  const [articles, setArticle] = useState(null)
  const [blog, setBlog] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchArticles = async () => {
      if (user) {
        try {
          const blog = await BlogRepository.getBlogByUser(user._id)
          if (blog) {
            setBlog(blog)
            const articles = await ArticleRepository.getArticleByBlog(blog._id)
            setArticle(articles)
          }
        } catch (error) {
          console.error(error)
        }
      } else {
        navigate('/login')
      }
    }
    fetchArticles()
  }, [user, blog, navigate])

  const changeVisibility = async () => {
    await BlogRepository.updateBlog(blog._id, blog.title, blog.description, blog.status === "public" ? "private" : "public")
  }

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
          {
            blog ?
              blog.status == "private" ?
                <button className="config-btn visibility" onClick={changeVisibility}>Visibilité : Privé<i className="fa-solid fa-eye-slash"></i></button>
                :
                <button className="config-btn visibility" onClick={changeVisibility}>Visibilité : Public<i className="fa-solid fa-eye"></i></button>
              :
              <button className="config-btn visibility">Visibilité : <Loader /></button>
          }
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
