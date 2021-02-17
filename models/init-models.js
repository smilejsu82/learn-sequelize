var DataTypes = require("sequelize").DataTypes;
var _friends = require("./friends");
var _scores = require("./scores");
var _users = require("./users");

function initModels(sequelize) {
  var friends = _friends(sequelize, DataTypes);
  var scores = _scores(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  friends.belongsTo(users, { as: "user", foreignKey: "friend_id"});
  users.hasMany(friends, { as: "friends", foreignKey: "friend_id"});
  scores.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(scores, { as: "scores", foreignKey: "user_id"});

  return {
    friends,
    scores,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
