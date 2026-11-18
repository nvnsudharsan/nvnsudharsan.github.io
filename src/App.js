import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
/* import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; */
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Research from './components/Research';
import Updates from './components/Updates';
import Photography from './components/Photography';
import Footer from './components/Footer';
import { ThemeProvider } from './ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/research" element={<Research />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/photography" element={<Photography />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
