import router from './index';
import express, { Express, NextFunction, Request, Response } from 'express';
import CategoryModel from '../models/Category';
import categoriesController from '../controllers/CategoriesController';
const routerCategories = express.Router();

const validateCategoryId = async (req: Request, res: Response, next: NextFunction) => {
  const category = await CategoryModel.findByPk(req.params.categoryId);
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }
  next();
}

routerCategories.get('/categories', categoriesController.index);

routerCategories.post('/categories', categoriesController.create);

routerCategories.get('/categories/:categoryId', validateCategoryId, categoriesController.show);

routerCategories.put('/categories/:categoryId', validateCategoryId, categoriesController.update);

routerCategories.delete('/categories/:categoryId', validateCategoryId, categoriesController.delete);

export default routerCategories;

