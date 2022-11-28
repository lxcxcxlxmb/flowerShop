import { Op } from 'sequelize';
import { NextFunction, Request, Response } from 'express';
import CategoryModel from '../models/Category';

class CategoriesController {

  index = async (req: Request, res: Response, next: NextFunction) => {
    const params = req.query;
    const limit: number = params.page ? parseInt(params.limit as string) : 100;
    const page: number = params.page ? parseInt(params.page as string) : 1;
    const offset: number = (page - 1) * limit;
    const sort: string = params.sort ? params.sort as string : 'id';
    const order: string = params.order ? params.order as string : 'ASC';
    const where: any = {};

    if (params.description) {
      where.description = {
        [Op.iLike]: `%${params.description}%`
      };
    }

    const categories = await CategoryModel.findAll({
      where: where,
      limit: limit,
      offset: offset,
      order: [[sort, order]]
    });
    res.json(categories);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this._validateData(req.body);
      const category = await CategoryModel.create(data);
      res.json(category);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req: Request, res: Response, next: NextFunction) => {
    const category = await CategoryModel.findByPk(req.params.categoryId);
    res.json(category);
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.categoryId;
      const data = await this._validateData(req.body, id);
      await CategoryModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await CategoryModel.findByPk(id));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req, res, next) => {
    await CategoryModel.destroy({
      where: {
        id: req.params.categoryId
      }
    });
    res.json({});
  }

  _validateData = async (data, id) => {
    const attributes = ['description'];
    const category = {};
    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }
      category[attribute] = data[attribute];
    }

    if (await this._checkIfDescriptionExists(category.description, id)) {
      throw new Error(`The category with description "${category.description}" already exists.`);
    }

    return category;
  }

  _checkIfDescriptionExists = async (description, id) => {
    const where = {
      description: description
    };

    if (id) {
      where.id = { [Op.ne]: id }; // WHERE id != id
    }

    const count = await CategoryModel.count({
      where: where
    });

    return count > 0;
  }

}

module.exports = new CategoriesController();
