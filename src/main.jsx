import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

function App() {
  return (
    <div className="page">
      <div className="card">
        <div className="badge">● AI Match</div>
        <h1>GMatch</h1>
        <p>დაწერე აზრი და იპოვე მსგავსი ადამიანი</p>

        <textarea placeholder="დაწერე შენი აზრი..." />

        <input placeholder="Instagram @username" />

        <div className="privacy">
          <b>ვინ ნახოს შენი აზრი?</b>
          <label>
            <span>ყველამ</span>
            <input name="privacy" type="radio" />
          </label>
          <label>
            <span>მხოლოდ მსგავსი აზრის მქონემ</span>
            <input name="privacy" type="radio" defaultChecked />
          </label>
        </div>

        <button>მოძებნე Match</button>

        <small>სხვის აზრებს ნახავ მხოლოდ შენი აზრის დაწერის შემდეგ.</small>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
