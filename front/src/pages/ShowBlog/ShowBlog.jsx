import "./ShowBlog.scss";
import ArticleCard from "../../components/ArticleCard/ArticleCard.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import BlogRepository from "../../repository/BlogRepository.js";
import { useUser } from "../../providers/UserContext";

function ShowBlog() {
  const [blog, setBlog] = useState(null)
  const { user } = useUser();

  useEffect(() => {
    const fetchBlog = async () => {
      if (user) {
        try {
          const blog = await BlogRepository.getBlogByUser(user._id)
          setBlog(blog)
        } catch (error) {
          setBlog(null)
        }
      } 
    }
    fetchBlog()
  }, [user])

  return (
    <>
      <div className="container">
        <h1>Votre espace personnel</h1>
        <div className="user-area">
          <h3>{blog?.author_name}</h3>
          <div className="user-action">
            <Link className="create-btn" to="/dashboard/new">
              Créer un article<i className="fa-solid fa-plus"></i>
            </Link>
          </div>
        </div>
        <div className="article-grid">

          {blog ?
            blog?.articles.map((article, index) => (
              <ArticleCard article={article} key={index} />
            ))
            :
            <h1><Loader /></h1>
          }
        </div>
      </div>
    </>
  );
}

export default ShowBlog;
