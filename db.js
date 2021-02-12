const {Sequelize} = require('sequelize')
const sequelize = new Sequelize("makuro", "root", "Makuro_123",
    {
        "host": "localhost",
        "dialect": "mysql"
    }
)

module.exports = { sequelize }