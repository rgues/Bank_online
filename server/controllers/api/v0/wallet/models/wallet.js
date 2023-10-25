
const { User } = require("../../user/models/user");
const { Currency } = require("./currency");
const { Transaction } = require("./transaction");

const { Model, DataTypes , sequelize}  = require('../../../../../sequelize');

class Wallet extends Model {}

Wallet.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    status:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[0,25]
        }
    },
    reference:{
        type: DataTypes.STRING,
        validate: {
            len:[0,100]
        }
    },
    transaction_type:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[0,25]
        }
    },
    amount:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    currencyId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Currency,
            key:'id'
        }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:User,
            key:'id'
        }
    },
    balance:{
        type: DataTypes.DOUBLE
    },
    transaction_date: {
        type:DataTypes.DATE,
        allowNull:false
    },
    transactionId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model: Transaction,
            key:'id'
        }
    },
    message:{
        type: DataTypes.STRING,
        defaultValue:''
    },
    confirm:{
        type: DataTypes.INTEGER,
        defaultValue:0,
        validate:{
            min:0,
            max:1
        }
    },
    archive:{
        type: DataTypes.INTEGER,
        defaultValue:0
    }
},{sequelize, freezeTableName: true,modelName:'Wallet',paranoid: true, deletedAt: 'destroyTime'});

module.exports = { Wallet } 