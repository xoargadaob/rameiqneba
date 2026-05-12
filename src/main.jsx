import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

function App() {
  const [thought, setThought] = useState('');
  const [instagram, setInstagram] = useState('');
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
        'https://rame-iqneba-api.onrender.com/api/thoughts/match',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            thought,
            instagram,
            visibility: 'similar_only'
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
          დაწერე რაც ფიქრობ. იქნებ მარტო არ ხარ.
        </p>

        <textarea
          placeholder="დაწერე შენი აზრი..."
          value={thought}
          onChange={(e) => setThought(e.target.value)}
        />

        <input
          placeholder="შენი Instagram"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />

        <button
          type="button"
          className="main-btn"
          onClick={handleMatch}
        >
          ვნახოთ ვინ ფიქრობს შენნაირად
        </button>

        {message && (
          <div className="result">
            {message}
          </div>
        )}

        <p className="note">
          სხვის აზრებს მხოლოდ მაშინ ნახავ, როცა შენც დაწერ.
        </p>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
