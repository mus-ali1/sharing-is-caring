const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model { }

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

        recipes_id: {
            type: DataTypes.INTEGER,
            references: {

                model: "recipes",
                key: "id",
            },
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
        
    
)