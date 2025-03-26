const sequelize = require('../db');
const {Model, DataTypes} = require('sequelize');

class CategoryThroughs extends Model {

}

CategoryThroughs.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },

    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'CategoryThroughs'
})

module.exports = CategoryThroughs