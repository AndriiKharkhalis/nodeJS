const { Router } = require('express');

const carController = require('../controllers/cars.controller');

const carsRouter = Router();

carsRouter.post('/', carController.createCar);

carsRouter.get('/', carController.getAllCars);

carsRouter.get('/:carsIndex', carController.getCarById);

carsRouter.delete('/:carsIndex', carController.deleteCar);

carsRouter.put('/:carsIndex', carController.updateCar);

module.exports = carsRouter;