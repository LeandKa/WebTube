'use strict';
module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    videoUrl: DataTypes.STRING
  }, {});
  Video.associate = function(models) {
    Video.belongsTo(models.User,{foreignKey:'userId'});
    Video.hasMany(models.Comments)
  };
  return Video;
};