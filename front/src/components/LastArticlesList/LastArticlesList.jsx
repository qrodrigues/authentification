
import ArticleRepository from "../../repository/ArticleRepository";
import TopArticle from "./LastArticle/LastArticle";
import "./LastArticlesList.scss";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

function TopArticlesList() {
  const [articles, setArticles] = useState(null)


  useEffect(() => {
    const fetchArticles = async () => {
      const data = await ArticleRepository.getAmountArticles(5)
      setArticles(data)
    }
    fetchArticles()
  }, [])


  return (
    <>
      <div className="top_blog">
        <h2>Les derniers articles <i className="fa-regular fa-star"></i></h2>
        {articles ?
          articles.map((article, index) => (
            <TopArticle article={article} key={index} />
          ))
          :
          <h1><Loader /></h1>
        }
      </div>
    </>
  )
}

export default TopArticlesList
