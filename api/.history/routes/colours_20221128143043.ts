import router from './index';
import express, { Express, NextFunction, Request, Response } from 'express';
import ColourModel from '../models/Colour';
import coloursController from '../controllers/ColoursController';
const routerColours = express.Router();

const validateColourId = async (req, res, next) => {
  const colour = await ColourModel.findByPk(req.params.colourId);
  if (!colour) {
    return res.status(404).json({ error: 'Colour not found' });
  }
  next();
}

router.get('/colours', coloursController.index);

router.post('/colours', coloursController.create);

router.get('/colours/:colourId', validateColourId, coloursController.show);

router.put('/colours/:colourId', validateColourId, coloursController.update);

router.delete('/colours/:colourId', validateColourId, coloursController.delete);

export default routerColours;
