const { DataTypes, Model } = require('sequelize');
const db = require('../db');

class Event extends Model { };

Event.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: db,
  tableName: 'events',
  modelName: 'Event'
});

module.exports = Event;
