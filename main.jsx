import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import './styles.css';

function GMatch() {
  const [thought, setThought] = useState('');
  const [instagram, setInstagram] = useState('');
  const [privacy, setPrivacy] = useState('similar_only');
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = thought.trim().length > 2 && instagram.trim().length > 1;

  function handleSubmit(event) {
    event.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-5 overflow-hidden relative">
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute w-72 h-72 bg-violet-600 blur-3xl rounded-full -top-10 -left-16"
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.18, 0.1] }}
        transition={{ repeat: Infinity, duration: 7 }}
        className="absolute w-80 h-80 bg-fuchsia-500 blur-3xl rounded-full -bottom-20 -right-20"
      />

      <motion.main
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md bg-zinc-950/80 backdrop-blur-xl rounded-[2rem] p-7 border border-zinc-800 shadow-2xl relative"
      >
        <div className="text-center mb-7">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            AI Match
          </div>
          <h1 className="text-5xl font-black tracking-tight">GMatch</h1>
          <p className="text-zinc-400 mt-3">დაწერე აზრი და იპოვე მსგავსი ადამიანი</p>
        </div>

        <form onSubmit={handleSubmit}>
          <textarea
            value={thought}
            onChange={(event) => setThought(event.target.value)}
            placeholder="დაწერე შენი აზრი..."
            className="w-full h-36 rounded-3xl bg-zinc-900 p-4 outline-none resize-none mb-4 border border-zinc-800 focus:border-violet-500 transition text-base"
          />

          <input
            value={instagram}
            onChange={(event) => setInstagram(event.target.value)}
            placeholder="Instagram @username"
            className="w-full rounded-3xl bg-zinc-900 p-4 outline-none mb-4 border border-zinc-800 focus:border-fuchsia-500 transition"
          />

          <div className="bg-zinc-900 rounded-3xl p-4 border border-zinc-800 mb-5">
            <p className="text-sm font-semibold mb-3">ვინ ნახოს შენი აზრი?</p>
            <label className="flex items-center justify-between py-2 text-sm text-zinc-300 cursor-pointer">
              <span>ყველამ</span>
              <input
                name="privacy"
                type="radio"
                checked={privacy === 'public'}
                onChange={() => setPrivacy('public')}
                className="w-5 h-5 accent-violet-600"
              />
            </label>
            <label className="flex items-center justify-between py-2 text-sm text-zinc-300 cursor-pointer">
              <span>მხოლოდ მსგავსი აზრის მქონემ</span>
              <input
                name="privacy"
                type="radio"
                checked={privacy === 'similar_only'}
                onChange={() => setPrivacy('similar_only')}
                className="w-5 h-5 accent-fuchsia-500"
              />
            </label>
          </div>

          <motion.button
            type="submit"
            disabled={!canSubmit}
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: canSubmit ? 1.02 : 1 }}
            className="w-full bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-700 disabled:text-zinc-400 transition rounded-3xl p-4 font-bold shadow-lg shadow-violet-700/30"
          >
            მოძებნე Match
          </motion.button>
        </form>

        <p className="text-xs text-zinc-500 text-center mt-5">სხვის აზრებს ნახავ მხოლოდ შენი აზრის დაწერის შემდეგ.</p>

        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="mt-5 rounded-3xl border border-violet-700/40 bg-zinc-900 p-4"
            >
              <p className="font-bold">აზრი მიღებულია ✅</p>
              <p className="text-sm text-zinc-400 mt-1">შემდეგ ეტაპზე აქ გამოჩნდება AI Match და ჩატი.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<GMatch />);
