const User = require('../models').User;    
const Video = require('../models').Video;
const Comment = require('../models').Comments;



module.exports = {
    async storeComment (req,res){
        const comment = await Comment.create(req.body);
        res.json(comment);
    },

    async updateComment(req,res){
        try {
            const commentId = req.params.commentId
            const update = await Comment.update(req.body,{
                where:{id:commentId}});
            if(update){
               const updateComment = await Comment.findOne({where:{id:commentId}});
               return res.status(200).json({
                   comment:updateComment
               })
            }else{
                throw new Error('Comment Not Found');
            }
        } catch (error) {
            return res.status(404).send(error.message);
        }
      },
  
      async deleteComment (req,res){
         try {
             const commentId = req.params.commentId;
             const deleted = await Comment.destroy({
                 where:{id:commentId}
             });
             if(deleted){
                return res.status(200).send('Comment Deleted');
             }else{
                 throw new Error('Comment not Found');
             }
         } catch (error) {
             return res.status(404).send(error.message);
         }
      }
};