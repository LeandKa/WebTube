const User = require('../models').User;    
const Video = require('../models').Video;
const Comment = require('../models').Comments;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


module.exports = {

    async findByString (req,res){
        try {
           const query = req.params.query;
           const videos = await Video.findAll({
              where: {
                title: {
                  [Op.substring]: query
                }
              }
            });
            if(videos){
              return res.status(200).json({
                videos:videos
              })
            }else{
                throw new Error(`there is not video with${query}`);
            }

        } catch (error) {
             return res.status(404).send(error.message);
        }
    },

    async getById (req,res){
        try {
            const id  = req.params.query;
            const usuario = await User.findByPk(id)
            return res.json(usuario);

        } catch (error) {
            console.log(error)
        }
    },

    async getByIdVideo (req,res){
      try {
          const id  = req.params.query;
          const video = await Video.findByPk(id)
          return res.status(200).json({
            message:'Foi',
            video:video
          });

      } catch (error) {
          console.log(error)
      }
  },

    async find(req,res){
      const userId = req.params.query;
      const user = await User.findByPk(userId,{
          include:[Video]
      })
      res.json(user);
    },

    async getAll(req,res){
      
      const video = await Video.findAll();
      return res.status(200).json({
        message:'Success',
        videos:video
      });
    },

    async getVideoOneAllComments(req,res){
       const videoId = req.params.query;
       const video = await Video.findByPk(videoId,{
         include:[Comment,User]
       })
       return res.status(200).json({
         message:'Success',
         video:video
       })
    }

}