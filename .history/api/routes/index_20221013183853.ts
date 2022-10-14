import cors from 'cors';
import express, { } from 'express';
import routerUsers from './users';
import routerStates from './states';
import routerCities from './cities';
import routerLogin from './login';

const router = express.Router();
router.use(cors());
router.use(routerUsers);
router.use(routerStates);
router.use(routerCities);
router.use(routerLogin);

export default router;