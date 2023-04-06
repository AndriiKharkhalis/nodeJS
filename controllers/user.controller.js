const { userInfo } = require('os');
const { findById } = require('../dataBase/User.model');
const User = require('../dataBase/User.model');
const ApiError = require('../error/ApiError');


module.exports = {

   createUser: async (req, res, next) => {
      try {
         const createUser = await User.create(req.body);

         res.status(201).json(createUser);
      } catch (e) {
         next(e);
      }
   },

   getAllUsers: async (req, res, next) => {
      try {
         const { limit = 20, page = 1 } = req.query;
         const skip = (page - 1) * limit;

         const users = await User.find().limit(limit).skip(skip);
         const count = await User.count();

         res.render('users',
            {
               page,
               perPage: limit,
               data: users,
               count
            }
         );

         // res.json({
         //    page,
         //    perPage: limit,
         //    data: users,
         //    count
         // });
      } catch (e) {
         next(e);
      }
   },

   getUserById: async (req, res, next) => {
      try {
         const { userIndex } = req.params;
         const user = await User.findById(userIndex);

         // const { userIndex } = req.params;
         // const user = DBusers[userIndex];
         // Якщо на обгортати async/await, то ERR_HTTP_HEADERS_SENT
         // Якщо на обгортати try/catch, то при обробці !user відповідь буде null

         if (!user) {
            next(new ApiError(`User with ID ${userIndex} not found`, 400));
            return;
         }
         res.json(user);

      } catch (e) {
         next(e);
      }
   },

   deleteUser: async (req, res, next) => {
      try {
         const { userIndex } = req.params;
         const deletedUser = await User.findOneAndDelete({ _id: userIndex }); // якщо deleteOne - то тре вказати, що буде тим ід

         if (!deletedUser) {
            next(new ApiError(`User ${userIndex} not found`, 404));
            return;
         }

         res.json({ 
            message: `User ${userIndex} deleted`, 
            deletedUser: deletedUser 
        });

      } catch (e) {
         next(e);
      }
   },


   updateUser: async (req, res, next) => {
      try {
         const { userIndex } = req.params;
         const updateUser = await User.findOneAndUpdate({ _id: userIndex }, { $set: req.body });
         // const user = DBusers[userIndex];
         // Object.assign(DBusers[userIndex], req.body);

         if (!updateUser) {
            next(new ApiError(`User with ID ${ userIndex } not found`, 404));
            return;
         }

         res.json(updateUser);

      } catch (e) {
         next(e);
      }
   }
}