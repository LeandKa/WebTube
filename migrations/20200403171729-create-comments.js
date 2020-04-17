'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      text: {
        type: Sequelize.STRING
      },
      userId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{model:'Users',key:'id'},
        onUpdate:'CASCADE',
        OnDelete:'CASCADE'
      },
      videoId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{model:'Videos',key:'id'},
        onUpdate:'CASCADE',
        OnDelete:'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('comments');
  }
};