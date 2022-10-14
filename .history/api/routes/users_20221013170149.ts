import { NextFunction, Request, Response } from 'express';
import router from './index';
import UserModel from '../models/User';
import usersController from '../controllers/UsersController';
const routerUsers = express.Router();

const validateUserId = async (req: Request, res: Response, next: NextFunction) => {
  const user = await UserModel.findByPk(req.params.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  next();
}

router.get('/users', usersController.index);

router.post('/users', usersController.create);

router.get('/users/:userId', validateUserId, usersController.show);

router.put('/users/:userId', validateUserId, usersController.update);

router.delete('/users/:userId', validateUserId, usersController.delete);