'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    username:DataTypes.STRING,
    password: DataTypes.STRING,
    avatarPath: DataTypes.STRING,
    avatarUrl: DataTypes.STRING
  }, {});
  User.associate = function(models) {
   User.hasMany(models.Video);
   User.hasMany(models.Comments)
  };
  return User;
};