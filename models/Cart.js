const sequelize = require('../db');
const {Model, DataTypes} = require('sequelize');

class Cart extends Model {

}

Cart.init({
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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


module.exports = Cart