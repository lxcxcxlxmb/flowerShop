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

  update = async (req: Request, res: Response, next: any) => {
    try {
      const id: any = req.params.eventId;
      const event = await EventModel.build(req.body);
      const data = await this._validateData(event, id);
      await EventModel.update(data,
        {
          where: {
            id: id
          }
        });
      res.json(await EventModel.findByPk(id));
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  delete = async (req: Request, res: Response, next: any) => {
    await EventModel.destroy({
      where: {
        id: req.params.eventId
      }
    });
    res.json({});
  }

  _validateData = async (data: EventModel, id?: number) => {
    if (!data.description) {
      throw new Error(`Description is required.`);
    }

    if (await this._checkIfDescriptionExists(data.description, id)) {
      throw new Error(`Event of "${data.description}" already exists.`);
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

    const count = await EventModel.count({
      where: where
    });

    return count > 0;
  }

}

export default new EventsController();
