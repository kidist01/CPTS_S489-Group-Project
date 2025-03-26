const sequelize = require('../db');
const {Model, DataTypes} = require('sequelize');
const CartItem = require('./CartItem.js');

class Cart extends Model {

}

Cart.init({
    cartId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Cart'
});

Cart.hasMany(CartItem, { foreignKey: 'cartId' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

module.exports = Cart