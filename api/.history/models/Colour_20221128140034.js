const { DataTypes, Model } = require('sequelize');
const db = require('../db');

class Colour extends Model { };

Colour.init({
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
  tableName: 'colours',
  modelName: 'Colour'
});

module.exports = Colour;
