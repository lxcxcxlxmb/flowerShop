import router from './index';
import express, { Express, NextFunction, Request, Response } from 'express';
import ColourModel from '../models/Colour';
import coloursController from '../controllers/ColoursController';
import { LogController } from '../controllers/LogController';
const logController = new LogController();
const routerColours = express.Router();

const validateColourId = async (req: Request, res: Response, next: NextFunction) => {
  const colour = await ColourModel.findByPk(req.params.colourId);
  if (!colour) {
    return res.status(404).json({ error: 'Colour not found' });
  }
  next();
}

routerColours.get('/colours', coloursController.index);

routerColours.post('/colours', coloursController.create, logController.create);

routerColours.get('/colours/:colourId', validateColourId, coloursController.show);

routerColours.put('/colours/:colourId', validateColourId, coloursController.update, logController.create);

routerColours.delete('/colours/:colourId', validateColourId, coloursController.delete, logController.create);

export default routerColours;
