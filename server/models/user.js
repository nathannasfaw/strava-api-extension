/**
 * This file defines what information we store about a user.
 * 
 * Basic info: name, email
 * Strava info: id, accessToken, refreshToken, tokenExpiresAt
 * Running stats: averagePace, weeklyMileage
 * Location: where the user is running
 * Preferences: trainingDays, preferredDistance, preferredPace, raceGoals
 */


// require() is how we import modules in Node.js
// DataTypes is used to define what kind of data each column in your table holds.
// sequelize is the object we use to interact with our database.
// Sequalize is a library that allows us to interact with our database using JavaScript.
const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

// This creates a table called 'Users' in our database with the following columns that are defined below.
const User = sequelize.define('User', {
  id: {
    // UUID is a unique identifier for each user
    // UUIDV4 is a function that generates a random UUID
    // primaryKey: true means that there is a unique identifier for each user
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  // These are strings and dates related to authenticating with Strava’s API.
  stravaId: {
    type: DataTypes.STRING,
    // means it doesnt allow duplicate values
    unique: true,
    // means it doesnt allow users to leave it blank
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    // validates that the email is a valid email address through Sequelize's validation
    validate: {
      isEmail: true
    }
  },
  // This is the user's name
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // These are strings and dates related to authenticating with Strava’s API.
  accessToken: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // This is the refresh token for the user
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // This is the date and time when the access token expires
  tokenExpiresAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  // This is the average pace of the user
  averagePace: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  // This is the weekly mileage of the user
  weeklyMileage: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  // This is the location of the user with latitude and longitude
  location: {
    type: DataTypes.GEOMETRY('POINT'),
    allowNull: true
  },
  preferences: {
    // JSONB is a data type that allows us to store JSON objects in our database
    type: DataTypes.JSONB,
    // This is the default value for the preferences column
    defaultValue: {
      trainingDays: [],
      preferredDistance: null,
      preferredPace: null,
      raceGoals: []
    }
  },
  // This is the date and time when the user last synced their data
  lastSync: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['stravaId']
    },
    {
      fields: ['email']
    },
    {
      fields: ['location'],
      using: 'GIST'
    }
  ]
});

// This exports the User model so that it can be used in other files
// Can be used in other files by calling require('./models/user')
module.exports = User; 