const adminRouter = require('express').Router();
const { listUsers,updateUserStatus,updateRole } = require('../controller/admin');
const errorHandler = require('../Handler/errorHandler/errHandler');

adminRouter.get('/listUsers',errorHandler(listUsers));
adminRouter.put('/isActive',errorHandler(updateUserStatus));
adminRouter.put('/updateRole',errorHandler(updateRole));

module.exports = adminRouter; 