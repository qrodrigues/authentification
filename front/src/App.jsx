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
import SingleBlogPage from './pages/SingleBlogPage/SingleBlogPage'
import CreateArticlePage from './pages/CreateArticlePage/CreateArticlePage';
// import UpdateBlogPage from './pages/UpdateBlogPage/UpdateBlogPage'
// import UpdateArticlePage from './pages/UpdateArticlePage/UpdateArticlePage'

import { useEffect } from "react";
import { useUser } from './providers/UserContext';
import SessionHelper from './helpers/SessionHelper';


function App() {

const {setUser} = useUser();   

useEffect(() =>  {
    const fetchUser = async () => {
        try {
            const resp_user = await SessionHelper.getConnectedUser();
            console.log(resp_user);
            return resp_user
        } catch (error) {
            console.log(error);
            return null
        }
    }

    const setUserData = async () => {
        const userData = await fetchUser();
        setUser(userData);
    };

    setUserData()
},[]);


  return (
    <>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/blog/:blogid" element={<SingleBlogPage />} />
          <Route path="/dashboard/new" element={<CreateArticlePage />} />
          {/* <Route path="/dashboard/update" element={<UpdateBlogPage />} /> */}
          {/* <Route path="/dashboard/update/:articleid" element={<UpdateArticlePage />} /> */}
        </Routes>
    </>
  )
}

export default App
