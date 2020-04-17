'use strict';
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define('Comments', {
    text: DataTypes.STRING
  }, {});
  comments.associate = function(models) {
    comments.belongsTo(models.User,{foreignKey:'userId'});
    comments.belongsTo(models.Video,{foreignKey:'videoId'});
  };
  return comments;
};