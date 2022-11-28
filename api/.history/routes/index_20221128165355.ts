import cors from 'cors';
import express, { } from 'express';
import routerUsers from './users';
import routerStates from './states';
import routerCities from './cities';
import routerLogin from './login';
import routerFlowers from './flowers';
import routerEvents from './events';
import routerColours from './colours';
import routerCategories from './categories';

const router = express.Router();
router.use(cors());
router.use(routerUsers);
router.use(routerStates);
router.use(routerCities);
router.use(routerLogin);
router.use(routerFlowers);
router.use(routerEvents);
router.use(routerColours);
router.use(routerCategories);

export default router;