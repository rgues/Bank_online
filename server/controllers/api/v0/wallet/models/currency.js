const { Model, DataTypes , sequelize}  = require('../../../../../sequelize');

class Currency extends Model {}

Currency.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[0,25]
        }
    },
    code:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[0,10]
        }
    },
    label:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[0,25]
        }
    },
    description:{
        type: DataTypes.STRING,
        allowNull:true,
        validate:{
            len:[0,100]
        }
    },
    active:{
        type: DataTypes.INTEGER,
        defaultValue:0
    }
},{sequelize, freezeTableName: true,modelName:'Currency'});

module.exports = { Currency } 