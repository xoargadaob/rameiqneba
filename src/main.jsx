import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

function App() {
  const [thought, setThought] = useState('');
  const [instagram, setInstagram] = useState('');
  const [privacy, setPrivacy] = useState('public');
  const [message, setMessage] = useState('');

  async function handleMatch() {
    if (!thought.trim()) {
      setMessage('ჯერ აზრი დაწერე');
      return;
    }

    if (!instagram.trim()) {
      setMessage('ჯერ Instagram ჩაწერე');
      return;
    }

    setMessage('Match იძებნება...');

    try {
      const response = await fetch(
        'https://rameiqneba.onrender.com/api/thoughts/match',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            thought,
            instagram,
            visibility: privacy
          })
        }
      );

      const data = await response.json();

      if (data.matches && data.matches.length > 0) {
        setMessage(
          `ნაპოვნია მსგავსი ადამიანი: @${data.matches[0].instagram}`
        );
      } else {
        setMessage(
          'ჯერ მსგავსი აზრი ვერ ვიპოვეთ. შენი აზრი შევინახეთ ✅'
        );
      }
    } catch (error) {
      setMessage('დაფიქსირდა შეცდომა');
    }
  }

  return (
    <div className="page">
      <div className="card">
        <div className="badge">● რამე იქნება AI</div>

        <h1>რამე იქნება</h1>

        <p className="subtitle">
          დაწერე აზრი და იპოვე მსგავსი ადამიანი
        </p>

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
          <p className="privacy-title">
            🔒 კონფიდენციალურობა
          </p>

          <button
            type="button"
            className={
              privacy === 'public'
                ? 'privacy-card active'
                : 'privacy-card'
            }
            onClick={() => setPrivacy('public')}
          >
            <span>
              <b>ყველამ ნახოს</b>
              <small>შენი აზრი გამოჩნდება საჯაროდ</small>
            </span>

            <span
              className={
                privacy === 'public'
                  ? 'circle active-circle'
                  : 'circle'
              }
            ></span>
          </button>

          <button
            type="button"
            className={
              privacy === 'similar'
                ? 'privacy-card active'
                : 'privacy-card'
            }
            onClick={() => setPrivacy('similar')}
          >
            <span>
              <b>მხოლოდ მსგავსმა ნახოს</b>
              <small>AI მხოლოდ მსგავს ადამიანებს აჩვენებს</small>
            </span>

            <span
              className={
                privacy === 'similar'
                  ? 'circle active-circle'
                  : 'circle'
              }
            ></span>
          </button>
        </div>

        <button
          type="button"
          className="main-btn"
          onClick={handleMatch}
        >
          მოძებნე Match
        </button>

        {message && (
          <div className="result">
            {message}
          </div>
        )}

        <p className="note">
          სხვის აზრებს ნახავ მხოლოდ შენი აზრის დაწერის შემდეგ.
        </p>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
