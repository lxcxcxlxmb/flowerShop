import { DataTypes, Model } from 'sequelize';
import db from '../db';

class Category extends Model {
  declare id: number;
  declare description: string;
};

Category.init({
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
  tableName: 'categories',
  modelName: 'Category'
});

export default Category;

