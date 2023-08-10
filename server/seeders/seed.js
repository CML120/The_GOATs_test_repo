// Import the database connection
const db = require('../config/connection');

// Import model(s)
const { User } = require('../models');

// Import the data for seeding
const userSeeds = require('./users.json');

// When the database connection is opened, execute this callback function
db.once('open', async () => {
  try {
    // Remove all existing users
    await User.deleteMany({});

    // Insert new users using the data from userSeeds
    await User.insertMany(userSeeds);

    console.log('Users seeded successfully');

    // Exit the process with status code 0 (indicating success)
    process.exit(0);
  } catch (err) {
    // If an error occurs during the process, throw the error
    throw err;
  }
});
