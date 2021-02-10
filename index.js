const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = requre(__dirname  + './../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = requre('./user')(sequelize, Sequelize);
db.Comment = requre('./comment')(sequelize, Sequelize);


module.exports = db;