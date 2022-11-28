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
      const category = await CategoryModel.build(req.body);
      const data = await this._validateData(category);
      category.save();
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
      const category = await CategoryModel.build(req.body);
      const data = await this._validateData(category);
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

  delete = async (req: Request, res: Response, next: NextFunction) => {
    await CategoryModel.destroy({
      where: {
        id: req.params.categoryId
      }
    });
    res.json({});
  }

  _validateData = async (data: CategoryModel) => {
    if (!data.description) {
      throw new Error(`Description is required.`);
    }

    return data;
  }

  _checkIfDescriptionExists = async (description: string, id: number) => {
    const where: any = {
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

export default new CategoriesController();
