const { Op } = require('sequelize');
const ColourModel = require('../models/Colour');

class ColoursController {

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

    const colours = await ColourModel.findAll({
      where: where,
      limit: limit,
      offset: offset,
      order: [[sort, order]]
    });
    res.json(colours);
  }

  create = async (req, res, next) => {
    try {
      const data = await this._validateData(req.body);
      const colour = await ColourModel.create(data);
      res.json(colour);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  show = async (req, res, next) => {
    const colour = await ColourModel.findByPk(req.params.colourId);
    res.json(colour);
  }

  update = async (req, res, next) => {
    try {
      const id = req.params.colourId;
      const data = await this._validateData(req.body, id);
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

  delete = async (req, res, next) => {
    await ColourModel.destroy({
      where: {
        id: req.params.colourId
      }
    });
    res.json({});
  }

  _validateData = async (data, id) => {
    const attributes = ['description'];
    const colour = {};
    for (const attribute of attributes) {
      if (!data[attribute]) {
        throw new Error(`The attribute "${attribute}" is required.`);
      }
      colour[attribute] = data[attribute];
    }

    if (await this._checkIfDescriptionExists(colour.description, id)) {
      throw new Error(`The colour with description "${colour.description}" already exists.`);
    }

    return colour;
  }

  _checkIfDescriptionExists = async (description, id) => {
    const where = {
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

module.exports = new ColoursController();
