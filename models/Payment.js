const sequelize = require('../db');
const {Model, DataTypes} = require('sequelize');

class Payment extends Model {

}

Payment.init({
    paymentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false
    },
    paymentStatus: {
        type: DataTypes.STRING,
        allowNull: false
    },
    transactionDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    shippingState: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shippingZip: {
        type: DataTypes.STRING,
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Payment'
})

module.exports = Payment