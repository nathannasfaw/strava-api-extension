/**
 * This file manages how we match users together.
 * 
 * Stores pairs of usrs who match and the reason why they matched.
 * Stores a Match Score (how well they match from 0-100)
 * Stores the status of the match (pending, accepted, rejected)
 * Stores the last time the match was updated
 */
const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

// This creates a table called 'UserMatches' in our database
const UserMatch = sequelize.define('UserMatch', {
  // Each match gets a unique ID
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },

  // The first user in the match
  user1Id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },

  // The second user in the match
  user2Id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },

  // How well the users match (0-100)
  matchScore: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  // Why they matched (pace, location, goals, etc.)
  matchReasons: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: []
  },

  // Whether the match has been accepted
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
    defaultValue: 'pending'
  },

  // When the match was last updated
  lastInteraction: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  timestamps: true,
  indexes: [
    // This makes sure we don't get duplicate matches
    {
      fields: ['user1Id', 'user2Id'],
      unique: true
    },
    // This makes searching by status faster
    {
      fields: ['status']
    }
  ]
});

module.exports = UserMatch; 