const { Model, DataTypes , sequelize}  = require('../../../../../sequelize');
const { Currency } = require('./currency');

class Code extends Model {}

Code.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
  
    amountLimit:{
        type: DataTypes.FLOAT,
        allowNull:false,
        defaultValue:0
    },

    currency:{
        type: DataTypes.STRING,
        allowNull:false
    },

    codeReference:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[0,10]
        }
    },

    codeTransfer:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[0,5]
        }
    },

    active:{
        type: DataTypes.INTEGER,
        defaultValue:1
    }

},{sequelize, freezeTableName: true,modelName:'Code'});


module.exports = { Code } 