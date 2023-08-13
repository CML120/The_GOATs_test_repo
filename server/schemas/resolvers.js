const Word = require('../models/Word');
const User = require('../models/User');
const Profile = require('../models/Profile');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

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
        return await Word.find({ difficulty: parseInt(difficulty) });
      } catch (error) {
        throw new Error('Error fetching words');
      }
    },
    getUserByUsername: async (parent, { username }) => {
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
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
          throw new AuthenticationError("Incorrect login credentials!");
      };
      
      const correctPW = await user.isCorrectPassword(password);
      if (!correctPW) {
          throw new AuthenticationError("Incorrect login credentials!");
      };
      const token = signToken(user);
      return { token, user };
  },

  addWord: async (_, { word, difficulty, meaning }) => {
    try {
      const newWord = new Word({
        word,
        difficulty: parseInt(difficulty), // Parse difficulty to an integer
        meaning,
      });
      return await newWord.save();
    } catch (error) {
      throw new Error('Error adding word');
    }
  },
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
      // try {
      //   const newUser = new User({ username, email, password });
      //   return await newUser.save();
      // } catch (error) {
      //   throw new Error('Error adding user');
      // }
    },
    // addProfile: async (_, { profileFields }) => {
    //   try {
    //     const newProfile = new Profile(profileFields);
    //     return await newProfile.save();
    //   } catch (error) {
    //     throw new Error('Error adding profile');
    //   }
    // },

    updatePlayerLevel: async (_, { userId, newLevel }) => {
      try {
        const updatedUser = await User.findByIdAndUpdate(userId, { level: newLevel }, { new: true });
        return updatedUser;
      } catch (error) {
        throw new Error('Failed to update player level');
      }
    },
    
  };

module.exports = resolvers;
