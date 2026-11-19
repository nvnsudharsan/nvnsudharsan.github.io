import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaMoon, FaSun, FaTimes } from 'react-icons/fa';
import { useTheme } from '../ThemeContext';
import './Navbar.css';
import logoImage from '../assets/logo.png'; 

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const [menuOpen, setMenuOpen] = useState(false); // phone-width menu
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <Link to="/" className="logo-link" onClick={closeMenu}>
        <img src={logoImage} alt="Naveen Sudharsan Logo" className="logo-image" />
      </Link>
      <div className="nav-actions">
        <ul id="site-menu" className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/about" onClick={closeMenu}>About Me</Link></li>
          <li><Link to="/research" onClick={closeMenu}>Research</Link></li>
          <li><Link to="/photography" onClick={closeMenu}>Photography</Link></li>
          <li><Link to="/updates" onClick={closeMenu}>Updates</Link></li>
        </ul>
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? <FaSun /> : <FaMoon />}
        </button>
        {/* shown only at phone width; desktop keeps the full link row */}
        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
