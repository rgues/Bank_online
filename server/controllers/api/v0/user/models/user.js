const bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken');
const SALT_I = 10;
const config = require('../../../../../config/config').get(process.env.NODE_ENV)
const {sequelize, DataTypes, Model }  = require('./../../../../../sequelize');

class User extends Model {

   
    static isAdmin = async (id,cb) => {
        const user = this;
        try { 
            const data = await user.findByPk(id);
            cb(null,{isAdmin:data.slug === 'admin'})
        } catch(err) {
            cb(err)
        }   
    }

    static isManager = async (id,cb) => {
        const user = this;
        try { 
            const data = await user.findByPk(id);
            cb(null,{isAdmin:data.slug === 'admin' || data.slug === 'manager'})
        } catch(err) {
            cb(err)
        }   
    }

    static isCustomer = async (id,cb) => {
        const user = this;
        try { 
            const data = await user.findByPk(id);
            cb(null,{isAdmin:data.slug === 'admin' || data.slug === 'manager' || data.slug === 'client'})
        } catch(err) {
            cb(err)
        }   
    }

    static findByToken =  (token,cb) => {
        const user = this;
        if (token) {
        jwt.verify(token,config.SECRET,async (err,decode) => {
    
            if (err) return cb(err);
            try {
                const data = await user.findOne({where : {id:decode, token:token}});
                 cb(null,data)
            } catch (err) {
                return cb(err)
            }
          
        })
    } else {
        return cb(null)
    }
    }

    isActive =  () => {
        const user = this;
        return user.active === 1;
    }

    comparePassword =  (candidatePassword,cb) => {
      
        bcrypt.compare(candidatePassword,this.password, function(err, isMatch) {
        
            if(err) return cb(err);
            cb(null,isMatch);
        });
    }

    generateToken =  async (cb) => {
        const user = this; // toHexString
        const token = jwt.sign(String(user.id),config.SECRET);
        user.token = token;
        try {
            await user.save();
           return  cb(null,user);
        } catch (err) {
            return cb(err);
        }
    }

    deleteToken = async (token,cb) => {
        let  user = this;
        try {
            const data = await user.update({token: ''},{where:{token:token}}).exec();
            cb(null,data)   
        } catch (err) {
            cb(err)  
        }
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            is:/^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/i,
            isEmail:true,
            len:[0,100]
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false
    },
    firstname:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[0,100]
        }
    },
    lastname:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[0,100]
        }
    },
    address:{
        type: DataTypes.STRING,
        defaultValue:'',
        allowNull:true,
        validate:{
            len:[0,100]
        }
    },
    phone:{
        type: DataTypes.STRING,
        allowNull:true,
        defaultValue:null,
        validate:{
            is:/^[0-9](?:[- ]?[0-9]){5,15}$/i
        }
    },
    accountNumber:{
        type: DataTypes.BIGINT,
        allowNull:false,
        unique:true,
        validate:{
            len:[1,11]
        }
    },
    role:{
        type: DataTypes.STRING,
        allowNull:false,
        defaultValue:'client',
        validate:{
            len:[0,256]
        }
    },
    token:{
        type: DataTypes.STRING,
        defaultValue:'',
        allowNull:true,
        validate:{
            len:[0,256]
        }
    },
    active:{
        type: DataTypes.INTEGER,
        defaultValue:0,
        validate:{
            min:0,
            max:1
        }
    },
    canTransfer:{
        type: DataTypes.INTEGER,
        defaultValue:0,
        validate:{
            min:0,
            max:1
        }
    },
    archive:{
        type: DataTypes.INTEGER,
        defaultValue:0,
        validate:{
            min:0,
            max:1
        }
    },
    country:{
        type: DataTypes.INTEGER,
        defaultValue:0,
        allowNull:true,
        validate:{
            len:[0,256]
        }
    },
    createdBy:{
        type: DataTypes.INTEGER,
        defaultValue:0
    }
},{sequelize,freezeTableName: true,modelName:'User', paranoid: true, deletedAt: 'destroyTime'});

User.addHook('afterCreate',  (user,options) =>{
    if(user.getDataValue('password')) {
        bcrypt.genSalt(SALT_I, function(err,salt) {
            if(err) return Promise.reject(err);
            bcrypt.hash(user.password,salt, async function(err,hash) {
                if(err) return Promise.reject(err);
                user.password = hash;
                await user.save();
                
            });
        });
     }
});

module.exports = { User }