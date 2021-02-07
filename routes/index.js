const router = require('express').Router();
const {testAPI} = require('../controller/test');
const {register,activationRequest,login} = require('../controller/auth');
const errorHandler = require('../Handler/errorHandler/errHandler');
const { listUsers,updateUserStatus,updateRole } = require('../controller/admin');

router.post('/api/test3',errorHandler(testAPI));
router.post('/register',errorHandler(register));
router.post('/user/activate',errorHandler(activationRequest));
router.post('/login',errorHandler(login));
router.get('/admin/listUsers',errorHandler(listUsers));
router.put('/admin/isActive',errorHandler(updateUserStatus));
router.put('/admin/updateRole',errorHandler(updateRole));

module.exports = router;