const Word = require("../models/Word");
const User = require("../models/User");
const Profile = require("../models/Profile");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getWord: async (_, { id }) => {
      try {
        return await Word.findById(id);
      } catch (error) {
        throw new Error("Error fetching word");
      }
    },
    getWordsByDifficulty: async (_, { level }) => {
      try {
        return await Word.find({ level: parseInt(level) });
      } catch (error) {
        throw new Error("Error fetching words");
      }
    },
    getUserByUsername: async (_, { username }) => {
      try {
        return await User.findOne({ username });
      } catch (error) {
        throw new Error("Error fetching user by username");
      }
    },
    getProfile: async (_, { userId }) => {
      try {
        return await Profile.findOne({ user: userId }); // Assuming 'user' field in Profile refers to the User's ObjectId
      } catch (error) {
        throw new Error("Error fetching profile");
      }
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect login credentials!");
      }

      const correctPW = await user.isCorrectPassword(password);
      if (!correctPW) {
        throw new AuthenticationError("Incorrect login credentials!");
      }
      const token = signToken(user);
      return { token, user };
    },

    updatePlayerLevel: async (_, { userId, newLevel }) => {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { level: newLevel },
          { new: true }
        );
        return updatedUser;
      } catch (error) {
        throw new Error("Failed to update player level");
      }
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
        throw new Error("Error adding word");
      }
    },
    createUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password, level: 1 }); // Set the starting level to 1
      const token = signToken(user);
      return { token, user };
    },
    userById: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        return user;
      } catch (error) {
        throw new Error("Error fetching user by ID");
      }
    },
  },
};

module.exports = resolvers;
