const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt'); // hash and save passwords on node

// Set up a config file
const sequelize = require('../config/connection.js');

// create our User model
class User extends Model {
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }
  }

// create fields/columns for User model
User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4]
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8]
        }
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      profile_picture: {
        type: DataTypes.BLOB('long'),
        allowNull: true,
        defaultValue: null,
      }, 
      bio: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
    },
    hooks: {
        // set up beforeCreate and beforeUpdate hooks to ensure password encryption
        beforeCreate: async (newUserData) => {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        },
  
        beforeUpdate: async (updatedUserData) => {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
          return updatedUserData;
        }
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user'
    }
  );
  module.exports = User;