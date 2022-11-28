import router from './index';
import express, { Express, NextFunction, Request, Response } from 'express';
import EventModel from '../models/Event';
import eventsController from '../controllers/EventsController';
const routerEvents = express.Router();

const validateEventId = async (req: Request, res: Response, next: NextFunction) => {
  const event = await EventModel.findByPk(req.params.eventId);
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  next();
}

routerEvents.get('/events', eventsController.index);

routerEvents.post('/events', eventsController.create);

routerEvents.get('/events/:eventId', validateEventId, eventsController.show);

routerEvents.put('/events/:eventId', validateEventId, eventsController.update);

routerEvents.delete('/events/:eventId', validateEventId, eventsController.delete);

export default routerEvents;
