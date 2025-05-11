import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import WebsiteHeader from './components/WebsiteHeader/Header';
import Login from './pages/login';
import CandidateRegisterForm from './pages/candidateRegisterForm';
import ClientRegisterForm from './pages/clientRegisterForm';
import Dashboard from './pages/dashboard';
import OTPForm from './pages/otpForm';
import PanelHeader from './components/PanelHeader/PanelHeader';
import { useState } from 'react';
import ProfileUpload from './pages/profileUpload';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen text-white">
      {!isLoggedIn ? (
        <div className="background-gradient">
          <WebsiteHeader />
        </div>
      ) : (
        <div className="bg-white">
          <PanelHeader />
        </div>
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
