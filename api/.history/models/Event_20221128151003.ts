import { DataTypes, Model } from 'sequelize';
import db from '../db';

class Event extends Model {
  declare id: number;
  declare description: string;
};

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
