const { DataTypes, Model, Sequelize } = require('sequelize');
const { sequelize} = require('../db');
const { DbModel } = require('../models/db_model');
const { RouterModel } = require('../models/router_model');

class User extends DbModel{
    static fake = {
        name: Math.random().toString(26).substring(7),
        email: Math.random().toString(26).substring(7),
        password: Math.random().toString(26).substring(7)
    }
}

User.init({
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4
    }
},{ sequelize,underscored: true, timestamps: false})


class Users extends RouterModel(User){}
module.exports = { User, Users }