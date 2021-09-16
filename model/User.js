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