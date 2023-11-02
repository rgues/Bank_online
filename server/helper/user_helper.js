
const { Role } = require('../controllers/api/v0/user/models/role');
const { User } = require('../controllers/api/v0/user/models/user');

const isAccountNumber = (account) => {
    return /^[0-9]{1,11}$/i.test(account);
}

const isPhone = (phone) => {
    return /^[0-9](?:[- ]?[0-9]){5,15}$/i.test(phone);
}

const isEmail = (email) => {
    return /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/i.test(email);
}

const isPassword = (password) => {
    const len = String(password).length;
    return len >= 6 && len <= 256;
}

const isRole = async (role) => {
    const currentRole = await Role.findOne({where:{slug:role}});
    if (currentRole === null) {
        return false;
    } else {
        return currentRole instanceof Role;
    }
}

const emailExist = async (email) => {
    try {
        const currentUser = await User.findOne({where:{email:email}});
        if (currentUser === null) {
            return false;
        } else {
            return currentUser instanceof User ;
        }
        
    } catch (error) {
        return false;
    }
}

const accountExist = async (account) => {
    try {
        const currentAccount = await User.findOne({where:{accountNumber:account}});
        if (currentAccount === null) {
            return false;
        } else {
            return currentAccount instanceof User;
        }
         
    } catch (error) {
        return false;
    }
    
}

const isUser = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (user === null) {
            return false;
        } else {
            return user instanceof User;
        }
      
    } catch (error) {
        return false;
    }
}

const filterUser = (user) => {
    return {
        id:user.id,
        firstname:user.firstname,
        lastname:user.lastname,
        role:user.role, 
        accountNumber:user.accountNumber,
        phone:user.phone,
        email:user.email,
        address:user.address,
        country:user.country,
        active:user.active,
        canTransfer:user.canTransfer
    }
}

module.exports = {
    isUser,
    isAccountNumber,
    isRole,
    isEmail, 
    isPassword, 
    emailExist,
    accountExist,
    isPhone,
    filterUser
};