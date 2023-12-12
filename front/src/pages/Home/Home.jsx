import './Home.scss'
import TopArticlesList from '../../components/TopArticlesList/TopArticlesList'
import LastBlogGrid from '../../components/LastBlogGrid/LastBlogGrid'
function Home() {

  return (
    <>
    <div className="home_ctn">
      <div className="home_blog">
        <h1>Regardez les derniers blogs <i className="fa-solid fa-hourglass-start"></i></h1>
        <LastBlogGrid/>
      </div>
      <TopArticlesList/>
    </div>
    </>
  )
}

export default Home
