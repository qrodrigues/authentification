import './App.css'
import {
  Routes,
  Route,
} from "react-router-dom";
import RegisterPage from './Pages/RegisterPage/RegisterPage'
import LoginPage from './Pages/LoginPage/LoginPage'
import Navbar from './components/Navbar/Navbar'
import HomePage from './Pages/Home/Home'
import DashboardPage from './Pages/Dashboard/Dashboard'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </>
  )
}

export default App
