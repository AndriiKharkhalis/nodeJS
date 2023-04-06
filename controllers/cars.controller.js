const Car = require('../dataBase/Car.Model');

module.exports = {

   createCar: async (req, res, next) => {
      try {
         const createCar = await Car.create(req.body)

         res.status(201).json(createCar);

      } catch (e) {
         next(e);
      }
   },

   getAllCars: async (req, res, next) => {
      try {
         const cars = await Car.find();

         res.render('cars', { data: cars })

      } catch (e) {
         next(e)
      }
   },

   getCarById: async (req, res, next) => {
      try {
         const { carsIndex } = req.params;
         const car = await Car.findById(carsIndex);

         if (!car) {
            next(new Error(`Car with ID ${carsIndex} not found`));
            return;
         }

         res.json(car);

      } catch (e) {
         next(e);
      }
   },

   deleteCar: async (req, res, next) => {
      try {
         const { carsIndex } = req.params;
         const deletedCar = await Car.findByIdAndDelete(carsIndex);

         res.json(deletedCar);

      } catch (e) {
         next(e);
      }
   },

   updateCar: async (req, res, next) => {
      try {
         const { carsIndex } = req.params;
         const updateCar = await Car.updateOne({ _id: carsIndex }, { $set: req.body });

         res.json(updateCar);

      } catch (e) {
         next(e);
      }
   }
}