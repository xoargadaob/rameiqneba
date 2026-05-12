const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.log('MongoDB error:', error);
  });

const ThoughtSchema = new mongoose.Schema({
  thought: String,
  instagram: String,
  visibility: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Thought = mongoose.model('Thought', ThoughtSchema);

app.get('/', (req, res) => {
  res.json({
    message: 'რამე იქნება API მუშაობს 🚀'
  });
});

app.post('/api/thoughts/match', async (req, res) => {
  try {
    const { thought, instagram, visibility } = req.body;

    if (!thought || !instagram) {
      return res.status(400).json({
        error: 'აზრი და Instagram აუცილებელია'
      });
    }

    const matches = await Thought.find({
      thought: {
        $regex: thought,
        $options: 'i'
      }
    }).limit(5);

    const savedThought = await Thought.create({
      thought,
      instagram,
      visibility
    });

    res.json({
      success: true,
      savedThought,
      matches
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: 'Server error'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
