import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const API_URL = 'https://rameiqneba.onrender.com/';

function App() {
  const [text, setText] = useState('');
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState('');
  const [commentInputs, setCommentInputs] = useState({});

  async function loadPosts() {
    try {
      const response = await fetch(`https://rameiqneba.onrender.com/api/posts`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      setMessage('Feed ვერ ჩაიტვირთა');
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function createPost() {
    if (!text.trim()) {
      setMessage('ჯერ აზრი დაწერე');
      return;
    }

    try {
      const response = await fetch(`https://rameiqneba.onrender.com/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || 'დაფიქსირდა შეცდომა');
        return;
      }

      setText('');
      setMessage('დაიპოსტა ✅');
      loadPosts();
    } catch (error) {
      setMessage('დაფიქსირდა შეცდომა');
    }
  }

  async function likePost(id) {
    try {
      await fetch(`${API_URL}/api/posts/${id}/like`, {
        method: 'POST'
      });

      loadPosts();
    } catch (error) {
      setMessage('Like ვერ დაემატა');
    }
  }

  async function addComment(id) {
    const comment = commentInputs[id];

    if (!comment || !comment.trim()) {
      return;
    }

    try {
      await fetch(`${API_URL}/api/posts/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: comment })
      });

      setCommentInputs({
        ...commentInputs,
        [id]: ''
      });

      loadPosts();
    } catch (error) {
      setMessage('კომენტარი ვერ დაემატა');
    }
  }

  return (
    <div className="page">
      <div className="app">
        <header className="header">
          <div className="badge">● ანონიმური Feed</div>

          <h1 className="title">
            რამე იქნება<span className="cursor">|</span>
          </h1>

          <p className="subtitle">
            დაპოსტე აზრი. ნახე რას ფიქრობენ სხვები.
          </p>
        </header>

        <section className="composer">
          <textarea
            placeholder="დაწერე შენი აზრი..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button onClick={createPost} className="main-btn">
            დაპოსტე
          </button>

          {message && <div className="result">{message}</div>}
        </section>

        <section className="feed">
          {posts.length === 0 ? (
            <p className="empty">ჯერ აზრები არ არის.</p>
          ) : (
            posts.map((post) => (
              <article className="post-card" key={post._id}>
                <p className="post-text">“{post.text}”</p>

                <div className="post-actions">
                  <button onClick={() => likePost(post._id)}>
                    ❤️ მეც ასე ვფიქრობ · {post.likes}
                  </button>
                </div>

                <div className="comments">
                  {post.comments?.map((comment) => (
                    <p className="comment" key={comment._id}>
                      {comment.text}
                    </p>
                  ))}
                </div>

                <div className="comment-box">
                  <input
                    placeholder="დააკომენტარე..."
                    value={commentInputs[post._id] || ''}
                    onChange={(e) =>
                      setCommentInputs({
                        ...commentInputs,
                        [post._id]: e.target.value
                      })
                    }
                  />

                  <button onClick={() => addComment(post._id)}>
                    გაგზავნა
                  </button>
                </div>
              </article>
            ))
          )}
        </section>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
