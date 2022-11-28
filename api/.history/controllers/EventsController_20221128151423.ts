import { Op } from 'sequelize';
import { NextFunction, Request, Response } from 'express';
import EventModel from '../models/Event';

class EventsController {

  index = async (req, res, next) => {
    const params = req.query;
    const limit = params.limit || 100;
    const page = params.page || 1;
    const offset = (page - 1) * limit;
    const sort = params.sort || 'id';
    const order = params.order || 'ASC';
    const where = {};

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

  create = async (req, res, next) => {
    try {
      const data = await this._validateData(req.body);
      const event = await EventModel.create(data);
      res.json(event);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req, res, next) => {
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
