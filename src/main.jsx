import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

function App() {
  const [thought, setThought] = useState('');
  const [instagram, setInstagram] = useState('');
  const [privacy, setPrivacy] = useState('public');
  const [message, setMessage] = useState('');

  function handleMatch() {
    if (!thought.trim()) {
      setMessage('ჯერ აზრი დაწერე');
      return;
    }

    if (!instagram.trim()) {
      setMessage('ჯერ Instagram ჩაწერე');
      return;
    }

    setMessage('Match იძებნება...');

    setTimeout(() => {
      setMessage('ღილაკი მუშაობს ✅ შემდეგ ეტაპზე რეალურ Match სისტემას დავუკავშირებთ');
    }, 900);
  }

  return (
    <div className="page">
      <div className="card">
        <div className="badge">● AI Match</div>

        <h1>რამე იქნება</h1>
        <p className="subtitle">დაწერე აზრი და იპოვე მსგავსი ადამიანი</p>

        <textarea
          placeholder="დაწერე შენი აზრი..."
          value={thought}
          onChange={(e) => setThought(e.target.value)}
        />

        <input
          placeholder="Instagram @username"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />

        <div className="privacy-wrapper">
          <p className="privacy-title">🔒 კონფიდენციალურობა</p>

          <button
            type="button"
            className={privacy === 'public' ? 'privacy-card active' : 'privacy-card'}
            onClick={() => setPrivacy('public')}
          >
            <span>
              <b>ყველამ ნახოს</b>
              <small>შენი აზრი გამოჩნდება საჯაროდ</small>
            </span>
            <span className={privacy === 'public' ? 'circle active-circle' : 'circle'}></span>
          </button>

          <button
            type="button"
            className={privacy === 'similar' ? 'privacy-card active' : 'privacy-card'}
            onClick={() => setPrivacy('similar')}
          >
            <span>
              <b>მხოლოდ მსგავსმა ნახოს</b>
              <small>AI მხოლოდ მსგავს ადამიანებს აჩვენებს</small>
            </span>
            <span className={privacy === 'similar' ? 'circle active-circle' : 'circle'}></span>
          </button>
        </div>

        <button type="button" className="main-btn" onClick={handleMatch}>
          მოძებნე Match
        </button>

        {message && <div className="result">{message}</div>}

        <p className="note">სხვის აზრებს ნახავ მხოლოდ შენი აზრის დაწერის შემდეგ.</p>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
