const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  // word: String,
  // difficulty: String,
  // //meaning: String,
  // // other fields...
});

const Word = mongoose.model('Word', wordSchema);

module.exports = Word;