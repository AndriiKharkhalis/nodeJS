const { Router } = require('express');

const { userController } = require('../controllers');
const { userMiddlewares } = require('../middlewares');

const userRouter = Router();

userRouter.get('/', userController.getAllUsers);
userRouter.post('/', userMiddlewares.checkIsEmailDuplicate, userMiddlewares.checkUserAge, userController.createUser);

userRouter.all('/:userIndex', userMiddlewares.checkIsIdValid);
userRouter.get('/:userIndex', userController.getUserById);
userRouter.delete('/:userIndex', userController.deleteUser);
userRouter.put('/:userIndex', userMiddlewares.checkUserAge, userController.updateUser);


module.exports = userRouter;