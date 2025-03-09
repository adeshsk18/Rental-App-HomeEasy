import { createContext, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes, Link } from "react-router-dom";
import "./App.css";
import "./modern-styles.css";
import "./modern-ui.js";
import AdminHome from "./modules/admin/AdminHome";
import ForgotPassword from "./modules/common/ForgotPassword";
import Home from "./modules/common/Home";
import Login from "./modules/common/Login";
import Register from "./modules/common/Register";
import OwnerHome from "./modules/user/Owner/OwnerHome";
import RenterHome from "./modules/user/renter/RenterHome";
import Contact from "./modules/common/Contact";

export const UserContext = createContext();

function App() {
  const date = new Date().getFullYear();
  const [userData, setUserData] = useState();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const getData = async () => {
    try {
      const user = await JSON.parse(localStorage.getItem("user"));
      if (user && user !== undefined) {
        setUserData(user);
        setUserLoggedIn(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserData(null);
    setUserLoggedIn(false);
    window.location.href = "/";
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/properties", label: "Properties" },
    { path: "/contact", label: "Contact" },
    { path: "/register", label: "Register", hideWhenLoggedIn: true, className: "register-button" },
    { path: "/login", label: "Login", hideWhenLoggedIn: true, className: "login-button" }
  ];

  return (
    <UserContext.Provider value={{ userData, userLoggedIn }}>
      <div className="App">
        <Router>
          {/* Modern Navbar */}
          <nav className="navbar">
            <div className="navbar-container">
              <Link to="/" className="logo">House Rental</Link>
              <div 
                className={`hamburger ${menuOpen ? 'active' : ''}`} 
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation"
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
                {navLinks.map((link) => (
                  (!link.hideWhenLoggedIn || !userLoggedIn) && (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`nav-item ${link.className || ''}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )
                ))}
                {userLoggedIn && (
                  <>
                    {userData?.role === "admin" && (
                      <Link to="/adminhome" className="nav-item" onClick={() => setMenuOpen(false)}>
                        Admin Dashboard
                      </Link>
                    )}
                    {userData?.role === "owner" && (
                      <Link to="/ownerhome" className="nav-item" onClick={() => setMenuOpen(false)}>
                        Owner Dashboard
                      </Link>
                    )}
                    {userData?.role === "renter" && (
                      <Link to="/renterhome" className="nav-item" onClick={() => setMenuOpen(false)}>
                        Renter Dashboard
                      </Link>
                    )}
                    <div className="nav-item user-greeting-nav">
                      <span>Hi, {userData?.name}</span>
                    </div>
                    <Link 
                      to="/" 
                      className="nav-item logout-nav" 
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogOut();
                        setMenuOpen(false);
                      }}
                    >
                      Logout
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>

          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/contact" element={<Contact />} />
              {userLoggedIn ? (
                <>
                  <Route path="/adminhome" element={<AdminHome />} />
                  <Route path="/ownerhome" element={<OwnerHome />} />
                  <Route path="/renterhome" element={<RenterHome />} />
                </>
              ) : (
                <Route path="/login" element={<Login />} />
              )}
            </Routes>
          </div>

          {/* Modern Footer */}
          <footer className="footer">
            <div className="footer-container">
              <div className="footer-content">
                <div className="footer-section">
                  <h3>House Rental</h3>
                  <p>Find your perfect home</p>
                </div>
                <div className="footer-section">
                  <h3>Quick Links</h3>
                  <ul>
                    {navLinks.map((link) => (
                      (!link.hideWhenLoggedIn || !userLoggedIn) && (
                        <li key={link.path}>
                          <Link to={link.path}>{link.label}</Link>
                        </li>
                      )
                    ))}
                  </ul>
                </div>
                <div className="footer-section">
                  <h3>Contact</h3>
                  <p>Email: contact@houserental.com</p>
                  <p>Phone: +91 8217099506</p>
                  <p>Address: Vijayapura, Karnataka, India</p>
                </div>
              </div>
              <div className="footer-bottom">
                <p>© {date} House Rental. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
