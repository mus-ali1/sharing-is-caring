const Comment = require("./Comment");
const Recipe = require("./Recipe");
const User = require("./User");

User.hasMany(Recipe, {
  foreignKey: 'user_id'
});

Recipe.hasMany(Comment, {
  foreignKey: 'recipe_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Recipe.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Recipe, {
  foreignKey: 'recipe_id'
});

module.exports = {
  Comment,
  Recipe,
  User,
};

