const User = require('../models').User;    
const Video = require('../models').Video;
const Comment = require('../models').Comments;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const jwtDecode = require('jwt-decode');

module.exports = {
    async storeVideo (req,res){
        const token = req.headers.authorization;
       const tokenDescr = jwtDecode(token);
       console.log(tokenDescr)
        try {
            const videoBody = {
                title:req.body.title,
                videoUrl:req.body.videoUrl,
                description:req.body.description,
                userId:tokenDescr.id
            }
            const video = await Video.create(videoBody)
            if(video){
                return res.status(200).json({
                    video:video
                })
            }else{
                throw new Error('Not possible to create a Video')
            }
            } catch (error) {
                return res.status(404).send(error.message);
            }
    },

    async updateVideo(req,res){
        try {
            const videoId = req.params.videoId
            const update = await Video.update(req.body,{
                where:{id:videoId}});
            if(update){
               const updateVideo = await Video.findOne({where:{id:videoId}});
               return res.status(200).json({
                   Video:updateVideo
               })
            }else{
                throw new Error('Video Not Found');
            }
        } catch (error) {
            return res.status(404).send(error.message);
        }
      },
      async deleteVideo (req,res){
         try {
             const videoId = req.params.videoId;
             const deleted = await Video.destroy({
                 where:{id:videoId}
             });
             if(deleted){
                return res.status(200).send('Video Deleted');
             }else{
                 throw new Error('Video not Found');
             }
         } catch (error) {
             return res.status(404).send(error.message);
         }
      }
};