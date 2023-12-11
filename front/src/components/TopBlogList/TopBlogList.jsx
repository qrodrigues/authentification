// import { Link } from "react-router-dom";
import "./TopBlogList.scss";

function TopBlogList() {

    return (
      <>   
        <div className="top_blog">
            {/* <Link to={}></Link> */}
                <h2>Les meilleurs blogs <i className="fa-regular fa-star"></i></h2>
                <div className="top_blog_item">
                <h3>Apprendre à coder avec SINGH</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                </div>
                <div className="top_blog_item">
                <h3>ChatGPT pour les nuls</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                </div>
                <div className="top_blog_item">
                <h3>Les meilleures fraudes de 2023</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.</p>
                </div>
            </div>
      </>
    )
  }
  
  export default TopBlogList
