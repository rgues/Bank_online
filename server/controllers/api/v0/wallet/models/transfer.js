const { Model, DataTypes , sequelize}  = require('../../../../../sequelize');


class Transfer extends Model {}

Transfer.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    bankName:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[0,25]
        }
    },
    accountHolder:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[0,100]
        }
    },
    accountNumber:{
        type: DataTypes.INTEGER,
        allowNull:false
    },

    amountInFigure:{
        type: DataTypes.FLOAT,
        allowNull:false,
        defaultValue:0
    },

    amountInWord:{
        type: DataTypes.STRING,
        allowNull:false,
        defaultValue:''
    },
    purpose:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[0,1000]
        }
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
    message:{
        type: DataTypes.STRING,
        validate:{
            len:[0,1000]
        }
    },
  
    currency:{
        type: DataTypes.STRING,
        allowNull:false
    },
    archive:{
        type: DataTypes.INTEGER,
        defaultValue:0
    }
},{sequelize,modelName:'Transfer',  freezeTableName: true, paranoid: true, deletedAt: 'destroyTime'});


module.exports = { Transfer } 