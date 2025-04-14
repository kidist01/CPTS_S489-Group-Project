const sequelize = require('../db');
const {Model, DataTypes} = require('sequelize');
const Product = require('./Product.js');
const User = require('./User.js');

class Cart extends Model {

}

Cart.init({
    cartId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
}, {
    sequelize,
    modelName: 'Cart'
}, {
    indexes: [
        {unique: true,
            fields: ['UserId', 'ProductId']
        }
    ]
});


Cart.belongsTo(Product, { foreignKey: 'productId' });
Cart.belongsTo(User, { foreignKey: 'userId' });
User.hasOne(Cart, { foreignKey: 'userId' }); // User has one Profile


module.exports = Cart