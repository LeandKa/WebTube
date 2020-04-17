const User = require('../models').User;    
const Video = require('../models').Video;
const Comment = require('../models').Comments;
const File = require('../util/file');
const bcptry = require('bcryptjs');

module.exports = {
    async storeUser (req,res) {
        
        try {
            const salt = bcptry.genSaltSync(6);
            const hashPassword = bcptry.hashSync(req.body.password,salt);
            const image = req.file;
            const Url = `http://localhost:3000/img/${image.filename}`
            const usuarioBody = {
                name:req.body.name,
                username:req.body.username,
                password:hashPassword,
                avatarPath:image.path,
                avatarUrl:Url
            }
            const usario = await User.create(usuarioBody)
            if(usario){
                return res.status(200).json({
                    user:usario
                })
            }else{
                throw new Error('Not possible to create a User')
            }
            } catch (error) {
                return res.status(404).send(error.message);
            }
        
    },
    async updateUser(req,res){
      try {
          const userId = req.params.userId
          const update = await User.update(req.body,{
              where:{id:userId}});
          if(update){
             const updateUser = await User.findOne({where:{id:userId}});
             return res.status(200).json({
                 user:updateUser
             })
          }else{
              throw new Error('User Not Found');
          }
      } catch (error) {
          return res.status(404).send(error.message);
      }
    },

    async deleteUser (req,res){
       try {
           const userId = req.params.userId;
           if(userId){
             const usuario = await User.findOne({where:{id:userId}})
             File.deleteFile(usuario.avatarPath)
             const deleted = await User.destroy({
                where:{id:userId}
            });
            if(deleted){
               return res.status(200).send('User Deleted');
            }else{
                throw new Error('User not Found');
            }
           }
       } catch (error) {
           return res.status(404).send(error.message);
       }
    }
};