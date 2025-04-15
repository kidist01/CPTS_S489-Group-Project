const sequelize = require('../db');
const {Model, DataTypes} = require('sequelize');
const Product = require('./Product');
class OrderItem extends Model {

}

OrderItem.init({
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Products',
          key: 'productId'
        },
        allowNull: false,
        onDelete: 'CASCADE',
    }
    
}, {
    sequelize,
    modelName: 'OrderItem'
})

module.exports = OrderItem