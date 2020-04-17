const express= require('express');
const router = express.Router();
const controllerUser = require('../controllers/ControllerUser');
const ControlllerVideo = require('../controllers/controllerVideo');
const ControllerComment = require('../controllers/ControllerComment');
const uploadImg = require('../util/MulterConfigImg');
const passport = require('passport');

//Crud User
router.post('/create-user',uploadImg.single('img'),controllerUser.storeUser);
router.put('/update/user/:userId',passport.authenticate('jwt',{session:false}),controllerUser.updateUser);
router.delete('/delete/user/:userId',passport.authenticate('jwt',{session:false}),controllerUser.deleteUser);

//Crud Video
router.post('/video',passport.authenticate('jwt',{session:false}),ControlllerVideo.storeVideo);
router.put('/update/video/:videoId',passport.authenticate('jwt',{session:false}),ControlllerVideo.updateVideo);
router.delete('/delete/video/:videoId',passport.authenticate('jwt',{session:false}),ControlllerVideo.deleteVideo);

//Crud Comment
router.post('/comment',passport.authenticate('jwt',{session:false}),ControllerComment.storeComment);
router.put('/update/comment/:commentId',passport.authenticate('jwt',{session:false}),ControllerComment.updateComment);
router.delete('/delete/comment/:commentId',passport.authenticate('jwt',{session:false}),ControllerComment.deleteComment);


module.exports = router;