import { Op } from 'sequelize';
import { NextFunction, Request, Response } from 'express';
import FlowerModel from '../models/Flower';
import CategoryModel from '../models/Category';
import EventModel from '../models/Event';
import ColourModel from '../models/Colour';

class FlowersController {

  index = async (req: Request, res: Response, next: NextFunction) => {
    const params = req.query;
    const limit: number = params.page ? parseInt(params.limit as string) : 100;
    const page: number = params.page ? parseInt(params.page as string) : 1;
    const offset: number = (page - 1) * limit;
    const sort: string = params.sort ? params.sort as string : 'id';
    const order: string = params.order ? params.order as string : 'ASC';
    const where: any = {};

    if (params.name) {
      where.name = {
        [Op.iLike]: `%${params.name}%`
      };
    }

    if (params.category) {
      where.category = {
        [Op.iLike]: `%${params.category}%`
      };
    }

    const flowers = await FlowerModel.findAll({
      where: where,
      limit: limit,
      offset: offset,
      order: [[sort, order]],
      include: [{
        model: CategoryModel,
        required: false,
        attribute: 'description'
      }, {
        model: ColourModel,
        required: false,
        attribute: 'description'
      }, {
        model: EventModel,
        required: false,
        attribute: 'description'
      }]
    });
    res.json(flowers);
  }

  create = async (req, res, next) => {
    try {
      const data = await this._validateData(req.body);
      const flower = await FlowerModel.create(data);
      res.json(flower);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req, res, next) => {
    const flower = await FlowerModel.findByPk(req.params.flowerId);
    res.json(flower);
  }

  update = async (req, res, next) => {
    try {
      const id = req.params.flowerId;
      const data = await this._validateData(req.body, id);
      await FlowerModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await FlowerModel.findByPk(id));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req, res, next) => {
    await FlowerModel.destroy({
      where: {
        id: req.params.flowerId
      }
    });
    res.json({});
  }

  _validateData = async (data, id) => {
    const attributes = ['name', 'value', 'CategoryId', 'EventId', 'ColourId'];
    const flower = {};
    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }
      flower[attribute] = data[attribute];
    }

    if (await this._checkIfFlowerExists(flower.name, id)) {
      throw new Error(`A flower named "${flower.name}" already exists.`);
    }

    return flower;
  }

  _checkIfFlowerExists = async (name, id) => {
    const where = {
      name: name
    };

    if (id) {
      where.id = { [Op.ne]: id }; // WHERE id != id
    }

    const count = await FlowerModel.count({
      where: where
    });

    return count > 0;
  }

}

module.exports = new FlowersController();
