const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      idx: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      id: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      uldate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      img: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      content: {
        type:Sequelize.STRING(200),
        allowNull: true,
        defaultValue: null,
      },
      tag: {
        type:Sequelize.STRING(100),
        allowNull: true,
        defaultValue: null,
      },
    }, {
      sequelize,
      timestamps: false, // true일시, 필드명 자동 추가
      underscored: false,
      modelName: 'Post',
      tableName: 'postlist',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

    static associate(db){
      db.Post.belongsTo(db.User, { foreignKey: 'id', targetKey: 'email' });
      db.Post.belongsToMany(db.HashTag, { through: 'PostHashTag' });
    }
};