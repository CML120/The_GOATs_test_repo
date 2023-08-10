const Word = require('../models/Word');
const User = require('../models/User');
const Profile = require('../models/Profile');

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
    getUserByUsername: async (_, { username }) => {
      try {
        return await User.findOne({ username });
      } catch (error) {
        throw new Error('Error fetching user by username');
      }
    },
    getProfile: async (_, { criteria }) => {
      try {
        return await Profile.findOne(criteria);
      } catch (error) {
        throw new Error('Error fetching profile');
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
    addUser: async (_, { username, studentname, email, password }) => {
      try {
        const newUser = new User({ username, studentname, email, password });
        return await newUser.save();
      } catch (error) {
        throw new Error('Error adding user');
      }
    },
    addProfile: async (_, { profileFields }) => {
      try {
        const newProfile = new Profile(profileFields);
        return await newProfile.save();
      } catch (error) {
        throw new Error('Error adding profile');
      }
    },
  },
};

module.exports = resolvers;
