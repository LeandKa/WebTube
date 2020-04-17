const express= require('express');
const router = express.Router();
const Controller = require('../controllers/authController');

router.post('/Login',Controller.login);
router.post('/Logout');







module.exports = router;