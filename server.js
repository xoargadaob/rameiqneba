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
  userId: String,
  thought: String,
  normalizedThought: String,
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
    const {
      userId,
      thought,
      instagram,
      visibility
    } = req.body;

    if (!thought) {
      return res.status(400).json({
        error: 'აზრი აუცილებელია'
      });
    }

    const normalizedThought = thought
      .toLowerCase()
      .trim();

    const alreadyExists = await Thought.findOne({
      userId,
      normalizedThought
    });

    if (alreadyExists) {
      return res.status(409).json({
        error: 'ეს აზრი უკვე დაწერილი გაქვს'
      });
    }

    const matches = await Thought.find({
      normalizedThought: {
        $regex: normalizedThought,
        $options: 'i'
      }
    }).limit(5);

    const savedThought = await Thought.create({
      userId,
      thought,
      normalizedThought,
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
