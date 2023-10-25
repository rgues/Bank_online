const { 
   isAccountNumber, 
    isRole, 
    isPhone,
    isEmail, 
    isPassword , 
    emailExist,
    accountExist} = require('../helper/user_helper');

let userFormValidator =  async(req,res,next) => {

    const userData = req.body;
    const role = await isRole(userData.role);
    const email = await emailExist(userData.email);
    const account = await accountExist(userData.accountNumber);

    if (!userData.firstname) {
      return res.status(400).json({success: false,message: 'Firstname is required !'});
     }

     if (!userData.lastname) {
      return res.status(400).json({success: false,message: 'Lastname is required !'});
     }

     if (!userData.accountNumber) {
      return res.status(400).json({success: false,message: 'Account Number is required !'});
     }

     if (userData.accountNumber && !isAccountNumber(userData.accountNumber)) {
      return res.status(400).json({success: false,message: 'Account Number is invalid !'});
     }

     if (userData.accountNumber && account) {
      return res.status(400).json({success: false,message: 'Account Number already exist !'});
     }

     if (!userData.role) {
      return res.status(400).json({success: false,message: 'Role is required !'});
     }

     if (userData.role && !role) {
      return  res.status(400).json({success: false,message: 'Role is invalid !'});
     }

     if (!userData.email) {
      return res.status(400).json({success: false,message: 'Email is required !'});
     }

     
     if (userData.email && !isEmail(userData.email )) {
      return  res.status(400).json({success: false,message: 'Email is invalid !'});
     }

     if (userData.email && email) {
      return res.status(400).json({success: false,message: 'Email already exist !'});
     }

     if (!userData.phone) {
      return res.status(400).json({success: false,message: 'Phone is required !'});
    }

    if (userData.phone && !isPhone(userData.phone)) {
      return res.status(400).json({success: false,message: 'Phone is invalid !'});
    } 


     if (!userData.password) {
      return   res.status(400).json({success: false,message: 'Password is required !'});
     }

     if (userData.password && !isPassword(userData.password)) {
      return  res.status(400).json({success: false,message: 'Password should have at 6 digits !'});
     }
     
     next();

}

let userFormUpdateValidator = async(req,res,next) => {

    const userData = req.body;
    const role = await isRole(userData.role);
    
    if (!userData.firstname) {
      return res.status(400).json({success: false,message: 'Firstname is required !'});
     }

     if (!userData.lastname) {
      return res.status(400).json({success: false,message: 'Lastname is required !'});
     }

     if (!userData.role) {
      return res.status(400).json({success: false,message: 'Role is required !'});
     }

     
     if (userData.role && !role) {
      return res.status(400).json({success: false,message: 'Role is invalid !'});
     }

     if (!userData.address) {
      return res.status(400).json({success: false,message: 'Address is required !'});
     }

     if (!userData.phone) {
      return res.status(400).json({success: false,message: 'Phone is required !'});
    }

    if (userData.phone && !isPhone(userData.phone)) {
      return  res.status(400).json({success: false,message: 'Phone is invalid !'});
    } 

   
    next();
   
}

module.exports = {userFormValidator,userFormUpdateValidator}