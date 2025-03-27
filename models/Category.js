const sequelize = require('../db');
const {Model, DataTypes} = require('sequelize');

class Category extends Model {

}

Category.init({
    categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    categoryName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Category'
})

module.exports = Category