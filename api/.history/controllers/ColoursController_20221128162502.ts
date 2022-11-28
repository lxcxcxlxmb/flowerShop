import { Op } from 'sequelize';
import { NextFunction, Request, Response } from 'express';
import ColourModel from '../models/Colour';

class ColoursController {

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

    const colours = await ColourModel.findAll({
      where: where,
      limit: limit,
      offset: offset,
      order: [[sort, order]]
    });
    res.json(colours);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const colour = await ColourModel.build(req.body);
      const data = await this._validateData(colour);
      colour.save();
      res.json(colour);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req: Request, res: Response, next: NextFunction) => {
    const colour = await ColourModel.findByPk(req.params.colourId);
    res.json(colour);
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.colourId;
      const colour = await ColourModel.build(req.body);
      const data = await this._validateData(colour);
      await ColourModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await ColourModel.findByPk(id));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req: Request, res: Response, next: any) => {
    await ColourModel.destroy({
      where: {
        id: req.params.colourId
      }
    });
    res.json({});
  }

  _validateData = async (data: ColourModel, id?: number) => {
    if (!data.description) {
      throw new Error(`Description is required.`);
    }

    if (await this._checkIfDescriptionExists(data.description, id)) {
      throw new Error(`Description "${data.description}" already exists.`);
    }

    return data;
  }

  _checkIfDescriptionExists = async (description: string, id?: number) => {
    const where: any = {
      description: description
    };

    if (id) {
      where.id = { [Op.ne]: id }; // WHERE id != id
    }

    const count = await ColourModel.count({
      where: where
    });

    return count > 0;
  }

}

export default new ColoursController();
