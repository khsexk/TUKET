const Sequelize = require('sequelize');
const Post = require('./Post');
const HashTag = require('./HashTag');
const User = require('./User');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.HashTag = HashTag;

User.init(sequelize);
Post.init(sequelize);
HashTag.init(sequelize);

User.associate(db);
Post.associate(db);
HashTag.associate(db);

module.exports = db;