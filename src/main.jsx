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

    setMessage('Match იძებნება...');

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
        const match = data.matches[0];

        if (match.instagram) {
          setMessage(`ნაპოვნია მსგავსი ადამიანი: @${match.instagram}`);
        } else {
          setMessage('ნაპოვნია მსგავსი ადამიანი, მაგრამ Instagram არ აქვს მითითებული');
        }
      } else {
        setMessage('ჯერ მსგავსი აზრი ვერ ვიპოვეთ. შენი აზრი შევინახეთ ✅');
      }
    } catch (error) {
      setMessage('დაფიქსირდა შეცდომა');
    }
  }

  return (
    <div className="page">
      <div className="card">
        <div className="badge">● რამე იქნება AI</div>

        <h1 className="animated-title">
  <span>რამე იქნება</span>
  <span>რამე მოხდება</span>
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

        <p className="note">
          სხვის აზრებს მხოლოდ მაშინ ნახავ, როცა შენც დაწერ.
        </p>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
