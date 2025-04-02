//using sequlize 
const {Sequelize} = require('sequelize')

//configure it to the db
const sequelize = new Sequelize(
    {
        //dealing with sqlite do cmsdb1 crearte new cmsdb 
        dialect: 'sqlite',
        storage: './database/petstoredb.sqlite'
    }
);

module.exports = sequelize