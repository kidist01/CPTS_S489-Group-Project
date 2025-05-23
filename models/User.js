const sequelize = require('../db');
const {Model, DataTypes} = require('sequelize');
const Order = require('./Order.js');

class User extends Model {
    static async findUser(username, password){
        try{
            const user = await User.findOne(
                {
                    where: {
                        username: username,
                        password: password
                    }
                },
            );
            
            if(user && user.password == password){
                return user;
            }
            else{
                return null;
            }
        }
        catch(err){
            console.log(err);
        }
    }
}

User.init({
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    zip: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'User'
})


module.exports = User