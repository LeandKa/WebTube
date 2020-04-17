const express= require('express');
const router = express.Router();
const controllerUser = require('../controllers/ControllerUser');
const ControlllerVideo = require('../controllers/controllerVideo');
const ControllerComment = require('../controllers/ControllerComment');
const passport = require('passport');
const queryController = require('../controllers/queryController');

router.get('/videos/result/search::query',queryController.findByString);
router.get('/userMe/:query',queryController.getById);
router.get('/userMe/my-Videos/:query',queryController.find);
router.get('/videosAll',queryController.getAll);
router.get('/video/:query',queryController.getByIdVideo);
router.get('/video/withComments/:query',queryController.getVideoOneAllComments);








module.exports = router;