import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

function App() {
  const [thought, setThought] = useState('');
  const [instagram, setInstagram] = useState('');
  const [message, setMessage] = useState('');
  const [match, setMatch] = useState(null);

  async function handleMatch() {
    if (!thought.trim()) {
      setMessage('ჯერ აზრი დაწერე');
      setMatch(null);
      return;
    }

    setMessage('Match იძებნება...');
    setMatch(null);

    let userId = localStorage.getItem('rame_user_id');

    if (!userId) {
      userId = crypto.randomUUID();
      localStorage.setItem('rame_user_id', userId);
    }

    try {
      const response = await fetch(
        'https://rameiqneba.onrender.com/api/thoughts/match',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId,
            thought,
            instagram: instagram.trim(),
            visibility: 'similar_only'
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || 'დაფიქსირდა შეცდომა');
        return;
      }

      if (data.matches && data.matches.length > 0) {
        const foundMatch = data.matches[0];
        const percent = Math.round(foundMatch.score * 100);

        setMatch({
          ...foundMatch,
          percent
        });

        setMessage(`ნაპოვნია მსგავსი ადამიანი • ${percent}% Match`);
      } else {
        setMessage('ჯერ მსგავსი აზრი ვერ ვიპოვეთ. შენი აზრი შევინახეთ ✅');
      }
    } catch (error) {
      setMessage('დაფიქსირდა შეცდომა');
    }
  }

  function cleanInstagram(username) {
    return username.replace('@', '').trim();
  }

  return (
    <div className="page">
      <div className="card">
        <div className="badge">● რამე იქნება AI</div>

        <h1 className="animated-title">
          რამე იქნება<span className="cursor">|</span>
        </h1>

        <p className="subtitle">
          დაწერე რაც ფიქრობ. იქნებ მარტო არ ხარ.
        </p>

        <textarea
          placeholder="დაწერე შენი აზრი..."
          value={thought}
          onChange={(e) => setThought(e.target.value)}
        />

        <input
          placeholder="Instagram სურვილისამებრ"
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

        {match && (
          <div className="match-card">
            <div className="match-top">
              <span className="match-pill">{match.percent}% Match</span>
              <span className="match-dot"></span>
            </div>

            <p className="match-label">მსგავსი აზრი</p>

            <p className="match-thought">
              “{match.thought}”
            </p>

            {match.instagram ? (
              <a
                href={`https://instagram.com/${cleanInstagram(match.instagram)}`}
                target="_blank"
                rel="noreferrer"
                className="instagram-link"
              >
                Instagram-ზე გადასვლა @{cleanInstagram(match.instagram)}
              </a>
            ) : (
              <p className="no-instagram">
                ამ ადამიანს Instagram არ აქვს მითითებული
              </p>
            )}
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
