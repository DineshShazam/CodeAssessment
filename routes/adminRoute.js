const adminRouter = require('express').Router();
const { listUsers,updateUserStatus,updateRole } = require('../controller/admin');
const errorHandler = require('../Handler/errorHandler/errHandler');
const { tokenVerify } = require('../Handler/JWT_Auth/jwt');


adminRouter.get('/listUsers',tokenVerify,errorHandler(listUsers));
adminRouter.put('/isActive',tokenVerify,errorHandler(updateUserStatus));
adminRouter.put('/updateRole',errorHandler(updateRole));

module.exports = adminRouter; 