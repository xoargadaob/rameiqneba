const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.log(err);
  });

const ThoughtSchema = new mongoose.Schema({
  thought: String,
  instagram: String,
  visibility: String
});

const Thought = mongoose.model('Thought', ThoughtSchema);

app.post('/api/thoughts/match', async (req, res) => {
  try {
    const { thought, instagram, visibility } = req.body;

    const savedThought = await Thought.create({
      thought,
      instagram,
      visibility
    });

    const matches = await Thought.find({
      thought: thought
    });

    res.json({
      success: true,
      savedThought,
      matches
    });
  } catch (error) {
    res.status(500).json({
      error: 'Server error'
    });
  }
});

app.get('/api/thoughts', async (req, res) => {
  const thoughts = await Thought.find().sort({ _id: -1 });

  res.json(thoughts);
});

app.listen(3000, () => {
  console.log('Server running');
});
