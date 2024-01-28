const {sequelize, DataTypes, Model }  = require('./../../../../../sequelize');

class Notification extends Model {}

Notification.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            isAlpha:true
        }
    },
    type:{
        type: DataTypes.STRING,
        allowNull:false
    },
    description:{
        type: DataTypes.STRING,
        allowNull:false
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    delay:{
        type: DataTypes.INTEGER,
        defaultValue:0,
        allowNull:false
    },
    time:{
        type: DataTypes.INTEGER,
        defaultValue:0,
        allowNull:false
    },
    active:{
        type: DataTypes.INTEGER,
        defaultValue:1
    }
},{sequelize,freezeTableName: true,modelName:'Notification'});

module.exports = {Notification};
