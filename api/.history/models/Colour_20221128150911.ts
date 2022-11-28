import { DataTypes, Model } from 'sequelize';
import db from '../db';

class Colour extends Model {
  declare id: number;
  declare description: string;
};

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
