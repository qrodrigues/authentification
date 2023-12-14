import ArticleCard from "../../components/ArticleCard/ArticleCard.jsx";
import "./ShowBlog.scss";
import { useEffect, useState } from "react";
import BlogRepository from "../../repository/BlogRepository.js";
import { useUser } from "../../providers/UserContext.jsx";

function ShowBlog(props) {
  const [blog, setBlog] = useState(null)
  const { user } = useUser();

  useEffect(() => {
    const fetchBlog = async () => {
      const blog = await BlogRepository.getBlogByUser(user)
      console.log(blog);
      setBlog(blog)
    }
    fetchBlog()
  }, [])

  return (
    <>
      <div className="container">
        <h1>Votre espace personnel</h1>
        <div className="user-area">
          <h3>{props?.blog?.author && props.blog.author}</h3>
          <div className="user-action">
            <a className="create-btn" href="#">
              Créer un article<i className="fa-solid fa-plus"></i>
            </a>
          </div>
        </div>
        <div className="article-grid">
          {props?.blog?.articles.map((article, index) => (
            <ArticleCard article={article} key={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ShowBlog;
