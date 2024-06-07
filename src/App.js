import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import LoginModal from "./components/Modals/Login/Login";
import SignupModal from "./components/Modals/Signup/Signup";
import Projects from "./pages/Projects/Projects";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const openSignupModal = () => {
    setShowSignupModal(true);
  };

  const closeSignupModal = () => {
    setShowSignupModal(false);
  };

  const handleLogin = (username) => {
    setLoggedInUser(username);
    localStorage.setItem("loggedInUser", username);
    const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours
    localStorage.setItem("expirationTime", expirationTime);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("expirationTime");
  };

  useEffect(() => {
    const checkExpiration = () => {
      const expirationTime = localStorage.getItem("expirationTime");
      if (expirationTime && new Date().getTime() > expirationTime) {
        handleLogout();
      }
    };
    const interval = setInterval(checkExpiration, 1000);
    return () => clearInterval(interval);
  }, []);

  // Route guard to check if the user is logged in before accessing the projects page
  const ProjectsRoute = ({ element }) => {
    return loggedInUser ? element : <Navigate to="/" replace />;
  };

  return (
    <Router>
      <Navbar
        loggedInUser={loggedInUser}
        openLoginModal={openLoginModal}
        openSignupModal={openSignupModal}
        handleLogout={handleLogout}
      />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home user={loggedInUser} />} />
        <Route path="/projects" element={<ProjectsRoute element={<Projects user={loggedInUser} />} />} />
      </Routes>

      {/* Modals */}
      {showLoginModal && (
        <LoginModal onClose={closeLoginModal} onLogin={handleLogin} />
      )}
      {showSignupModal && <SignupModal onClose={closeSignupModal} />}
    </Router>
  );
};

export default App;
