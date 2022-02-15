const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      index: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      id: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      create: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      img: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,UNSIGNED,
        allowNull: false,
      },
      content: {
        type:Sequelize.STRING(200),
        allowNull: true,
        defaultValue: null,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Todo',
      tableName: 'todolist',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

    static associate(db){

    }
};