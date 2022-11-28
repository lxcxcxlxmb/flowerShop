import { DataTypes, Model } from 'sequelize';
import db from '../db';
import Category from './Category';
import Colour from './Colour';
import Event from './Event';

class Flower extends Model {
  declare id: number;
  declare name: string;
  declare value: number;
  declare CategoryId: number;
  declare ColourId: number;
  declare EventId: number;
};

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

export default Flower;

