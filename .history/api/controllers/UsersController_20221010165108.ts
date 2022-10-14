import { Op } from 'sequelize';
import { Request, Response } from 'express';
// import UserModel from '../models/User';
const UserModel = require('../models/User');

class UsersController {

  index = async (req: Request, res: Response, next) => {
    const params = req.query;
    const limit = params.limit || 100;
    const page = params.page || 1;
    const offset = (page - 1) * limit;
    const sort = params.sort || 'id';
    const order = params.order || 'ASC';
    const where = {};

    if (params.name) {
      where.name = {
        [Op.iLike]: `%${params.name}%`
      };
    }

    if (params.email) {
      where.email = {
        [Op.iLike]: `%${params.email}%`
      };
    }

    if (params.min_age) {
      where.age = {
        [Op.gte]: params.min_age
      };
    }

    if (params.max_age) {
      if (!where.age) {
        where.age = {};
      }
      where.age[Op.lte] = params.max_age;
    }

    if (params.sex) {
      where.sex = params.sex;
    }

    const users = await UserModel.findAll({
      where: where,
      limit: limit,
      offset: offset,
      order: [[sort, order]]
    });
    res.json(users);
  }

  // index = async (req: Request, res: Response) => {
  //   try {
  //     const users = await UserModel.findAll({});
  //     res.json(users);
  //   } catch (error) {
  //     res.status(400).json({ error: (error as Error).message });
  //   }
  // }

  create = async (req: Request, res: Response, next) => {
    try {
      const data = await this._validateData(req.body);
      const user = await UserModel.create(data);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  // create = async (req: Request, res: Response) => {
  //   try {
  //     const user = await UserModel.create(req.body);
  //     res.json(user);
  //   } catch (error) {
  //     res.status(400).json({ error: (error as Error).message });
  //   }
  // }

  show = async (req: Request, res: Response, next) => {
    const user = await UserModel.findByPk(req.params.userId);
    res.json(user);
  }

  update = async (req: Request, res: Response, next) => {
    try {
      const id: number = parseInt(req.params.userId);
      const data = await this._validateData(req.body, id);
      await UserModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await UserModel.findByPk(id));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req, res, next) => {
    await UserModel.destroy({
      where: {
        id: req.params.userId
      }
    });
    res.json({});
  }

  _validateData = async (data: any, id?: number) => {
    const attributes = ['name', 'age', 'sex', 'email'];
    const user: any = {};
    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }
      user[attribute] = data[attribute];
    }

    if (await this._checkIfEmailExists(user.email, id)) {
      throw new Error(`The user with mail address "${user.email}" already exists.`);
    }

    return user;
  }

  _checkIfEmailExists = async (email: string, id: number) => {
    const where = {
      email: email
    };

    if (id) {
      where.id = { [Op.ne]: id }; // WHERE id != id
    }

    const count = await UserModel.count({
      where: where
    });

    return count > 0;
  }

}

module.exports = new UsersController();
