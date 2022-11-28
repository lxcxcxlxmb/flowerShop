import router from './index';
import express, { Express, NextFunction, Request, Response } from 'express';
import FlowerModel from '../models/Flower';
import flowersController from '../controllers/FlowersController';
const routerFlowers = express.Router();

const validateFlowerId = async (req: Request, res: Response, next: NextFunction) => {
  const flower = await FlowerModel.findByPk(req.params.flowerId);
  if (!flower) {
    return res.status(404).json({ error: 'Flower not found' });
  }
  next();
}

routerFlowers.get('/flowers', flowersController.index);

routerFlowers.post('/flowers', flowersController.create);

routerFlowers.get('/flowers/:flowerId', validateFlowerId, flowersController.show);

routerFlowers.put('/flowers/:flowerId', validateFlowerId, flowersController.update);

routerFlowers.delete('/flowers/:flowerId', validateFlowerId, flowersController.delete);

export default routerFlowers;

