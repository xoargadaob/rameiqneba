import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

function App() {
  const [thought, setThought] = useState('');
  const [instagram, setInstagram] = useState('');
  const [privacy, setPrivacy] = useState('similar');
  const [message, setMessage] = useState('');

  function handleMatch() {
    if (!thought.trim()) {
      setMessage('ჯერ აზრი დაწერე');
      return;
    }

    if (!instagram.trim()) {
      setMessage('Instagram ჩაწერე');
      return;
    }

    setMessage('Match იძებნება...');

    setTimeout(() => {
      setMessage('ჯერ რეალური ბაზა არ არის ჩართული, მაგრამ ღილაკი უკვე მუშაობს ✅');
    }, 1000);
  }

  return (
    <div className="page">
      <div className="card">
        <div className="badge">● AI Match</div>

        <h1>GMatch</h1>
        <p>დაწერე აზრი და იპოვე მსგავსი ადამიანი</p>

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

        <div className="privacy">
          <b>ვინ ნახოს შენი აზრი?</b>

          <label>
            <span>ყველამ</span>
            <input
              name="privacy"
              type="radio"
              checked={privacy === 'public'}
              onChange={() => setPrivacy('public')}
            />
          </label>

          <label>
            <span>მხოლოდ მსგავსი აზრის მქონემ</span>
            <input
              name="privacy"
              type="radio"
              checked={privacy === 'similar'}
              onChange={() => setPrivacy('similar')}
            />
          </label>
        </div>

        <button onClick={handleMatch}>მოძებნე Match</button>

        {message && <div className="result">{message}</div>}

        <small>სხვის აზრებს ნახავ მხოლოდ შენი აზრის დაწერის შემდეგ.</small>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
