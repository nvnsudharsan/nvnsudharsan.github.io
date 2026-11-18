import React from 'react';
import { Link } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../ThemeContext';
import './Navbar.css';
import logoImage from '../assets/logo.png'; 

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <nav className="navbar">
      <Link to="/" className="logo-link">
        <img src={logoImage} alt="Naveen Sudharsan Logo" className="logo-image" />
      </Link>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Me</Link></li>
        <li><Link to="/research">Research</Link></li>
        <li><Link to="/photography">Photography</Link></li>
        <li><Link to="/updates">Updates</Link></li>
        <li>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <FaSun /> : <FaMoon />}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
