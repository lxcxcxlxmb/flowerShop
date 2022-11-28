const router = require('express').Router();
const FlowerModel = require('../models/Flower');
const flowersController = require('../controllers/FlowersController');

const validateFlowerId = async (req, res, next) => {
  const flower = await FlowerModel.findByPk(req.params.flowerId);
  if (!flower) {
    return res.status(404).json({ error: 'Flower not found' });
  }
  next();
}

router.get('/flowers', flowersController.index);

router.post('/flowers', flowersController.create);

router.get('/flowers/:flowerId', validateFlowerId, flowersController.show);

router.put('/flowers/:flowerId', validateFlowerId, flowersController.update);

router.delete('/flowers/:flowerId', validateFlowerId, flowersController.delete);

module.exports = router;
