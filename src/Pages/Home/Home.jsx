import './Home.scss'
import TopBlogList from '../../components/TopBlogList/TopBlogList'

function Home() {

  return (
    <>
    <div className="home_ctn">
      <div className="home_blog">
        <h1>Regardez les derniers blogs ...</h1>
      </div>
      <TopBlogList/>
    </div>
    </>
  )
}

export default Home
