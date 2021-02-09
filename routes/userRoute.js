const userRouter = require('express').Router();
const {testAPI} = require('../controller/test');
const {register,activationRequest,login} = require('../controller/auth');
const errorHandler = require('../Handler/errorHandler/errHandler');

userRouter.post('/login',errorHandler(login));
userRouter.post('/register',errorHandler(register));
userRouter.post('/activate',errorHandler(activationRequest));

module.exports = userRouter;