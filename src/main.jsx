import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

function App() {
  return (
    <div className="page">
      <div className="glow glow1"></div>
      <div className="glow glow2"></div>

      <div className="card">
        <div className="badge">
          <span className="dot"></span>
          AI Match
        </div>

        <h1>GMatch</h1>

        <p className="subtitle">
          დაწერე აზრი და იპოვე მსგავსი ადამიანი
        </p>

        <textarea placeholder="დაწერე შენი აზრი..." />

        <input placeholder="Instagram @username" />

        <div className="privacy-wrapper">
          <p className="privacy-title">
            🔒 კონფიდენციალურობა
          </p>

          <button className="privacy-card active">
            <div>
              <h3>ყველამ ნახოს</h3>
              <p>შენი აზრი გამოჩნდება საჯაროდ</p>
            </div>

            <div className="circle active-circle"></div>
          </button>

          <button className="privacy-card">
            <div>
              <h3>მხოლოდ მსგავსი აზრის მქონემ</h3>
              <p>AI მხოლოდ მსგავს ადამიანებს აჩვენებს</p>
            </div>

            <div className="circle"></div>
          </button>
        </div>

        <button className="main-btn">
          მოძებნე Match
        </button>

        <small>
          სხვის აზრებს ნახავ მხოლოდ შენი აზრის დაწერის შემდეგ.
        </small>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
