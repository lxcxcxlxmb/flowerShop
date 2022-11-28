const { DataTypes, Model } = require('sequelize');
const db = require('../db');
const Category = require('./Category');
const Colour = require('./Colour');
const Event = require('./Event');

class Flower extends Model { };

Flower.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  sequelize: db,
  tableName: 'flowers',
  modelName: 'Flower'
});

Category.hasMany(Flower);
Flower.belongsTo(Category);

Colour.hasMany(Flower);
Flower.belongsTo(Colour);

Event.hasMany(Flower);
Flower.belongsTo(Event);

module.exports = Flower;
