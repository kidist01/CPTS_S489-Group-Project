const sequelize = require('../db');
const {Model, DataTypes} = require('sequelize');
const OrderItem = require('./OrderItem.js');
const Cart = require('./Cart.js');

class Product extends Model {

}

Product.init({
    productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    stockNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.TEXT
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    sequelize,
    modelName: 'Product'
})

OrderItem.belongsTo(Product, { foreignKey: 'productId' }); // Each OrderItem belongs to one Product
Product.hasMany(OrderItem, { foreignKey: 'productId' });
Cart.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Product