const { Model, DataTypes , sequelize}  = require('../../../../../sequelize');
const { User } = require('../../user/models/user');
const { Currency } = require('./currency');
const { Payment } = require('./payment');

class Transaction extends Model {}

Transaction.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[0,25]
        }
    },
    paymentId:{
        type: DataTypes.INTEGER,
        references: {
            allowNull:false,
            model: Payment,
            key:'id'
        }
    },
    transferId:{
        type: DataTypes.INTEGER,
        allowNull:true,
        defaultValue:0
    },
    reference:{
        type: DataTypes.STRING,
        validate:{
            len:[0,100]
        }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references : {
            model: User,
            key:'id'
        }
    },
    tellerId:{
        type: DataTypes.INTEGER,
        allowNull:true,
        defaultValue:0,
        references : {
            model: User,
            key:'id'
        }
    },
    status:{
        type: DataTypes.STRING,
        defaultValue:'pending'
    },
    branch:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[0,1000]
        }
    },
    purpose:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[0,1000]
        }
    },
    remark:{
        type: DataTypes.STRING,
        allowNull:true,
        validate:{
            len:[0,1000]
        }
    },
    receiver_message:{
        type: DataTypes.STRING,
        validate:{
            len:[0,1000]
        }
    },
    amount_wallet:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    amount_paid:{
        type: DataTypes.DOUBLE,
        allowNull:false
    },
    currency_wallet:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Currency,
            key:'id'
        }
    },
    currency_paid:{
        type: DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Currency,
            key:'id'
        }
    },
    fees_paid:{
        type: DataTypes.FLOAT,
        defaultValue:0
    },
    fees_type:{
        type: DataTypes.STRING,
        defaultValue:'number'
    },
    rate:{
        type: DataTypes.FLOAT,
        defaultValue:0
    },
    discount:{
        type: DataTypes.FLOAT,
        defaultValue:0
    },
    transaction_date:{
        type: DataTypes.DATE,
        allowNull:false
    },
    confirm:{
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    archive:{
        type: DataTypes.INTEGER,
        defaultValue:0
    }
},{sequelize,modelName:'Transaction', paranoid: true, deletedAt: 'destroyTime'});

 
Transaction.addHook('beforeCreate', (transaction,options) =>{

    const currentDate = new Date();
    const alpha = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
    let alphaRef = '';
    for (let i=0; i< 5; i++) {
        alphaRef += alpha.charAt(Math.floor(Math.random()*26))
    }
    const reference = `${currentDate.getFullYear()}${currentDate.getMonth()}${currentDate.getDay()}${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}${alphaRef}${Math.floor(Math.random()*(100 -1) +1)}`;

    try {
        transaction.reference = reference;
     
    } catch (err) {
        return Promise.reject(err);
    }
});

module.exports = { Transaction } 