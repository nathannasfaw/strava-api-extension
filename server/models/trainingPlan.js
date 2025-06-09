/**
 * This file defines what information we store about a training plan.
 * 
 * Race info: raceType, raceDate, targetTime, currentWeek, totalWeeks
 * Schedule: schedule
 * Status: status
 */
const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

// This creates a table called 'TrainingPlans' in our database
const TrainingPlan = sequelize.define('TrainingPlan', {
  // Each training plan gets a unique ID
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },

  // What type of race the plan is for (marathon, 5K, etc.)
  raceType: {
    type: DataTypes.STRING,
    allowNull: false
  },

  // When the race is happening
  raceDate: {
    type: DataTypes.DATE,
    allowNull: false
  },

  // The target time for the race (like "4:00:00" for a marathon)
  targetTime: {
    type: DataTypes.STRING,
    allowNull: false
  },

  // The current week of the training plan (1-16 for a marathon)
  currentWeek: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },

  // The total number of weeks in the plan
  totalWeeks: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  // The actual training schedule (stored as JSON)
  // Example: { "week1": { "monday": { "type": "easy", "distance": 5 } } }
  schedule: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: {}
  },

  // Whether the plan is active or completed
  status: {
    type: DataTypes.ENUM('active', 'completed', 'paused'),
    defaultValue: 'active'
  },

  // Any notes or adjustments made to the plan
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  // This adds 'createdAt' and 'updatedAt' fields automatically
  timestamps: true
});

module.exports = TrainingPlan; 