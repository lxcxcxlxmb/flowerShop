import router from './index';
import express, { Express, NextFunction, Request, Response } from 'express';
import CategoryModel from '../models/Category';
import categoriesController from '../controllers/CategoriesController';
const routerCategories = express.Router();

const validateCategoryId = async (req, res, next) => {
  const category = await CategoryModel.findByPk(req.params.categoryId);
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }
  next();
}

router.get('/categories', categoriesController.index);

router.post('/categories', categoriesController.create);

router.get('/categories/:categoryId', validateCategoryId, categoriesController.show);

router.put('/categories/:categoryId', validateCategoryId, categoriesController.update);

router.delete('/categories/:categoryId', validateCategoryId, categoriesController.delete);

module.exports = router;
