// Import the database connection
const db = require('../config/connection');

// Import model(s)
//place models here
const {  } = require('../models');

// Import the data for seeding
const profileSeeds = require('./ -----------SEED FILE HERE ----------.json');

// When the database connection is opened, execute this callback function
db.once('open', async () => {
  try {
    // Your implementation here
    // EXAMPLE: Remove all existing documents from the 'Profile' collection
    // await Profile.deleteMany({});

    // Your implementation here
    // Create new documents in the 'Profile' collection using the data from profileSeeds
    // await Profile.create(profileSeeds);

    // Your implementation here
    // Display a success message
    // console.log('all done!');

    // Your implementation here
    // Exit the process with status code 0 (indicating success)
    // process.exit(0);
  } catch (err) {
    // Your implementation here
    // If an error occurs during the process, throw the error
    // throw err;
  }
});

