import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1>Welcome to Hair Counter</h1>
          <p>Track and manage your hair inventory effortlessly.</p>
        </header>
        <section className="features">
          <h2>Features</h2>
          <ul>
            <li>Count and track your hair inventory in real-time.</li>
            <li>Easy-to-use interface for quick and accurate hair counting.</li>
            <li>Generate reports and insights on hair inventory.</li>
          </ul>
        </section>
        <section className="cta">
          <h2>Get Started</h2>
          <p>Sign up now to start managing your hair inventory with Hair Counter.</p>
          <button className="cta-button">Sign Up</button>
        </section>
      </div>
    </Router>
  );
};

export default App;
