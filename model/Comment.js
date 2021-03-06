const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },

    recipe_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "recipe",
        key: "id",
      },
    },

    comment: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    upvote: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },

    downvote: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    tableName: "comment",
    freezeTableName: true,
    underscored: true,
    timestamps: false,
  }
);

module.exports = Comment;
