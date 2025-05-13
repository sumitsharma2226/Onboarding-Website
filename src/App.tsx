import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/home';
import WebsiteHeader from './components/WebsiteHeader/Header';
import Login from './pages/login';
import CandidateRegisterForm from './pages/candidateRegisterForm';
import ClientRegisterForm from './pages/clientRegisterForm';
import Dashboard from './pages/dashboard';
import OTPForm from './pages/otpForm';
import PanelHeader from './components/PanelHeader/PanelHeader';
import { useEffect, useState } from 'react';
import ProfileUpload from './pages/profileUpload';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const userStr = localStorage.getItem('loggedInUser');
    const isVerified = localStorage.getItem('isVerified') === 'true';
    setIsLoggedIn(!!userStr && isVerified);
  }, [location]);

  return (
    <div className="min-h-screen text-white background-gradient">
      {isLoggedIn ? (
        <PanelHeader />
      ) : (
        <WebsiteHeader />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/candidate-register" element={<CandidateRegisterForm />} />
        <Route path="/client-register" element={<ClientRegisterForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/otp" element={<OTPForm />} />
        <Route path="/profile-upload" element={<ProfileUpload />} />
      </Routes>
    </div>
  );
};

export default App;
