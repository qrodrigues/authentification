import './App.css'
import {
  Routes,
  Route,
} from "react-router-dom";
import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage'
import Navbar from './components/Navbar/Navbar'
import HomePage from './components/Home'
import DashboardPage from './components/Dashboard'

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
