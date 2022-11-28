import { Op } from 'sequelize';
import { NextFunction, Request, Response } from 'express';
import EventModel from '../models/Event';

class EventsController {

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

    const events = await EventModel.findAll({
      where: where,
      limit: limit,
      offset: offset,
      order: [[sort, order]]
    });
    res.json(events);
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const event = await EventModel.build(req.body);
      const data = await this._validateData(event);
      event.save();
      res.json(event);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req: Request, res: Response, next: any) => {
    const event = await EventModel.findByPk(req.params.eventId);
    res.json(event);
  }

  update = async (req, res, next) => {
    try {
      const id = req.params.eventId;
      const data = await this._validateData(req.body, id);
      await EventModel.update(data, {
        where: {
          id: id
        }
      });
      res.json(await EventModel.findByPk(id));
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req, res, next) => {
    await EventModel.destroy({
      where: {
        id: req.params.eventId
      }
    });
    res.json({});
  }

  _validateData = async (data, id) => {
    const attributes = ['description'];
    const event = {};
    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }
      event[attribute] = data[attribute];
    }

    if (await this._checkIfDescriptionExists(event.description, id)) {
      throw new Error(`The event with description "${event.description}" already exists.`);
    }

    return event;
  }

  _checkIfDescriptionExists = async (description, id) => {
    const where = {
      description: description
    };

    if (id) {
      where.id = { [Op.ne]: id }; // WHERE id != id
    }

    const count = await EventModel.count({
      where: where
    });

    return count > 0;
  }

}

module.exports = new EventsController();
