const {sequelize, DataTypes, Model }  = require('./../../../../../sequelize');

class Country extends Model {}

Country.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            isAlpha:true
        }
    },
    flag:{
        type: DataTypes.STRING,
        allowNull:false
    },
    code:{
        type: DataTypes.STRING,
        allowNull:false
    },
    prefix:{
        type: DataTypes.STRING,
        allowNull:false
    },
    active:{
        type: DataTypes.INTEGER,
        defaultValue:0
    }
},{sequelize,freezeTableName: true,modelName:"Country"});


module.exports = {Country};
