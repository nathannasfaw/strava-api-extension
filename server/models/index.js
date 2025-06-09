const { Sequelize } = require('sequelize');
const config = require('../config/database');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'strava_extension',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || 'postgres',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
  }
);

// Import models
const User = require('./user');
const TrainingPlan = require('./trainingPlan');
const Activity = require('./activity');
const UserMatch = require('./userMatch');

// Define relationships
User.hasMany(TrainingPlan);
TrainingPlan.belongsTo(User);

User.hasMany(Activity);
Activity.belongsTo(User);

User.belongsToMany(User, {
  through: UserMatch,
  as: 'matchedUsers',
  foreignKey: 'user1Id',
  otherKey: 'user2Id'
});

module.exports = {
  sequelize,
  User,
  TrainingPlan,
  Activity,
  UserMatch
}; 