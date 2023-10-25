const { Model, DataTypes , sequelize}  = require('../../../../../sequelize');
const { Country } = require('../../user/models/country');

class Payment extends Model {}

Payment.init({
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
    description:{
        type: DataTypes.STRING,
        allowNull:true,
        validate:{
            len:[0,100]
        }
    },   
    fees:{
        type: DataTypes.DOUBLE,
        allowNull:true,
        defaultValue:0
    },
    fees_type:{
        type: DataTypes.STRING,
        allowNull:true,
       defaultValue:'number'
    }
   ,countryId : {
        type: DataTypes.INTEGER,
        allowNull:true,
        references : {
            model: Country,
            key: 'id'
        }
    },
    active:{
        type: DataTypes.INTEGER,
        defaultValue:0
    }
},{sequelize,  freezeTableName: true, modelName:'Payment'});

module.exports = { Payment } 