import './App.css'
import {
  Routes,
  Route,
} from "react-router-dom";
import RegisterPage from './pages/RegisterPage/RegisterPage'
import LoginPage from './pages/LoginPage/LoginPage'
import LoginPageDualAuth from './pages/LoginPageDualAuth/LoginPageDualAuth'
import Navbar from './components/Navbar/Navbar'
import HomePage from './pages/Home/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import Blog  from './pages/Blog/Blog'
import FormArticlePage from './pages/Article/FormArticlePage/FormArticlePage'
import DualAuthentication from './pages/DualAuthentication/DualAuthentication'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

import { useEffect } from "react";
import { useUser } from './providers/UserContext';
import SessionHelper from './helpers/SessionHelper';


function App() {
const {setUser} = useUser();   

useEffect(() =>  {
    const fetchUser = async () => {
        try {
            const resp_user = await SessionHelper.getConnectedUser();
            return resp_user
        } catch (error) {
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
          <Route path='*' element={<NotFoundPage />}/>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/a2f/:user_id" element={<LoginPageDualAuth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/a2f" element={<DualAuthentication />} />
          <Route path="/blog/:blogid" element={<Blog />} />
          <Route path="/dashboard/new" element={<FormArticlePage />} />
          {/* <Route path="/dashboard/update" element={<UpdateBlogPage />} /> */}
          <Route path="/dashboard/update/:articleid" element={<FormArticlePage />} />
        </Routes>
    </>
  )
}

export default App
