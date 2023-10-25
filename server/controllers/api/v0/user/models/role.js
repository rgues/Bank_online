const {sequelize, DataTypes, Model }  = require('./../../../../../sequelize');

class Role extends Model {}

Role.init({
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
    slug:{
        type: DataTypes.STRING,
        allowNull:false
    },
    description:{
        type: DataTypes.STRING,
        allowNull:false
    },
    active:{
        type: DataTypes.INTEGER,
        defaultValue:0
    }
},{sequelize,freezeTableName: true,modelName:'Role'});

module.exports = {Role};
