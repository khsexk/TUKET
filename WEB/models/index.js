const Sequelize = require('sequelize');
const Post = require('./Post');
const HashTag = require('./HashTag');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Post = Post;
db.HashTag = HashTag;

Post.init(sequelize);
HashTag.init(sequelize);

module.exports = db;