/**
 * This file stores all the running activities that the user has done.
 * 
 * Basic info: stravaActivityId, startDate, type, distance, duration, averagePace, averageHeartRate, route, description, isTrainingPlanActivity, trainingPlanWeek, trainingPlanDay
 */
const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

// This creates a table called 'Activities' in our database
const Activity = sequelize.define('Activity', {
  // Each activity gets a unique ID
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },

  // The Strava activity ID (to avoid duplicates)
  stravaActivityId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },

  // When the activity happened
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },

  // The type of activity (run, walk, etc.)
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },

  // Distance in kilometers
  distance: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  // Duration in seconds
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  // Average pace (minutes per kilometer)
  averagePace: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  // Average heart rate (if available)
  averageHeartRate: {
    type: DataTypes.FLOAT,
    allowNull: true
  },

  // The route of the activity (stored as JSON)
  // Example: { "coordinates": [[lat, lng], [lat, lng]] }
  route: {
    type: DataTypes.JSONB,
    allowNull: true
  },

  // Any notes or description of the activity
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  // Whether this activity was part of a training plan
  isTrainingPlanActivity: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  // If it was part of a training plan, which week and day
  trainingPlanWeek: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  trainingPlanDay: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
  indexes: [
    // This makes searching by date faster
    {
      fields: ['startDate']
    },
    // This makes sure we don't get duplicate Strava activities
    {
      fields: ['stravaActivityId'],
      unique: true
    }
  ]
});

module.exports = Activity; 