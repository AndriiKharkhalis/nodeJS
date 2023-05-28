const { Router } = require('express');

const { carsController } = require('../controllers');

const carsRouter = Router();

carsRouter.post('/', carsController.createCar);

carsRouter.get('/', carsController.getAllCars);

carsRouter.get('/:carsIndex', carsController.getCarById);

carsRouter.delete('/:carsIndex', carsController.deleteCar);

carsRouter.put('/:carsIndex', carsController.updateCar);

module.exports = carsRouter;