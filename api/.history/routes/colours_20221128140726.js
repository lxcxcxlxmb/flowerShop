const router = require('express').Router();
const ColourModel = require('../models/Colour');
const coloursController = require('../controllers/ColoursController');

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

module.exports = router;
