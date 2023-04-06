const { Router } = require('express');

const userController = require('../controllers/user.controller');
const userMiddlewares = require('../middlewares/user.middlewares');

const userRouter = Router();


userRouter.get('/', userController.getAllUsers);

userRouter.post('/', userMiddlewares.checkIsEmailDuplicate, userMiddlewares.checkUserAge, userController.createUser);

userRouter.get('/:userIndex', userMiddlewares.checkIsIdValid, userController.getUserById);

userRouter.delete('/:userIndex', userMiddlewares.checkIsIdValid, userController.deleteUser);

userRouter.put('/:userIndex', userMiddlewares.checkIsIdValid, userMiddlewares.checkUserAge, userController.updateUser);


module.exports = userRouter;