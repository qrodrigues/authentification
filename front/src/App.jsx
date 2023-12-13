import './App.css'
import {
  Routes,
  Route,
} from "react-router-dom";
import RegisterPage from './pages/RegisterPage/RegisterPage'
import LoginPage from './pages/LoginPage/LoginPage'
import Navbar from './components/Navbar/Navbar'
import HomePage from './pages/Home/Home'
import DashboardPage from './pages/ShowBlog/ShowBlog'

function App() {
const blog = {
  "title": "CodeCrafting",
  "description": "Blog de Développement Web",
  "link": "/blogs/codecrafting",
  "articles": [
    {
      "title": "Maîtrisez JavaScript en 30 jours",
      "content": "Explorez les concepts avancés de JavaScript et devenez un expert en développement web. Des tutoriels pratiques et des astuces utiles vous attendent.",
      "link": "/blogs/codecrafting/articles/1"
    },
    {
      "title": "Les dernières tendances en CSS",
      "content": "Restez à jour avec les dernières fonctionnalités CSS. Apprenez à créer des mises en page modernes et réactives pour vos projets web.",
      "link": "/blogs/codecrafting/articles/2"
    }
  ],
  "author": "Emma Coder",
  "status": "public"
}

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage blog={blog} />} />
      </Routes>
    </>
  )
}

export default App
