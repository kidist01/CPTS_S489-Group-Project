const sequelize = require('../db');
const {Model, DataTypes} = require('sequelize');
const Product = require('./Product.js');

class CartItem extends Model {

}

CartItem.init({
    cartItemId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.DOUBLE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'CartItem'
})

CartItem.belongsTo(Product, { foreignKey: 'productId' }); // Each OrderItem belongs to one Product
Product.hasMany(CartItem, { foreignKey: 'productId' });

module.exports = CartItem