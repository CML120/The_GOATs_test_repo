const Word = require('../models/Word');

const resolvers = {
  Query: {
    getWord: async (_, { id }) => {
      try {
        return await Word.findById(id);
      } catch (error) {
        throw new Error('Error fetching word');
      }
    },
    getWordsByDifficulty: async (_, { difficulty }) => {
      try {
        return await Word.find({ difficulty });
      } catch (error) {
        throw new Error('Error fetching words');
      }
    },
  },
  Mutation: {
    addWord: async (_, { word, difficulty, meaning }) => {
      try {
        const newWord = new Word({ word, difficulty, meaning });
        return await newWord.save();
      } catch (error) {
        throw new Error('Error adding word');
      }
    },
  },
};

module.exports = resolvers;
