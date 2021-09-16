const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt'); // hash and save passwords on node

// Set up a config file
const sequelize = require('../config/connection.js');