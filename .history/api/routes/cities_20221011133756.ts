// export const router = require('express').Router();
import router from './index';
import { NextFunction, Request, Response } from 'express';
const CityModel = require('../models/City');
const citiesController = require('../controllers/CitiesController');

const validateCityId = async (req: Request, res: Response, next: NextFunction) => {
    const city: string = await CityModel.findByPk(req.params.cityId);
    if (!city) {
        return res.status(404).json({ error: 'City not found' });
    }
    next();
}

router.post('/cities', citiesController.create);

router.get('/cities', citiesController.index);

router.get('/cities/:cityId', validateCityId, citiesController.show);

router.put('/cities/:cityId', validateCityId, citiesController.update);

router.delete('/cities/:cityId', validateCityId, citiesController.delete);

export default routerCities;