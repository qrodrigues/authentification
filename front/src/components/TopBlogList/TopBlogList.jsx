
import TopBlog from "./TopBlog/TopBlog";
import "./TopBlogList.scss";

function TopBlogList() {

    const articles = [
      {
        title: "Apprendre à coder avec SINGH",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
        link:"articles/1"
    },
    {
      title: "ChatGPT pour les nuls",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
      link:"articles/2"
  },
  {
    title: "Les meilleures fraudes de 2023",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    link:"articles/3"
},
  ]


    return (
      <>   
        <div className="top_blog">
                <h2>Les meilleurs blogs <i className="fa-regular fa-star"></i></h2>
                {articles.map((article, index) => (
                                  <TopBlog article={article} key={index}/>
                ))}
            </div>
      </>
    )
  }
  
  export default TopBlogList
