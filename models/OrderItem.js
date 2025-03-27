const sequelize = require('../db');
const {Model, DataTypes} = require('sequelize');

class OrderItem extends Model {

}

OrderItem.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'OrderItem'
})

module.exports = OrderItem