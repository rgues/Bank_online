
const { admin } = require('../../../../../middleware/admin');
const { auth } = require('../../../../../middleware/auth');
const { manager } = require('../../../../../middleware/manager');
const { Country } = require('../models/country');
const { Role } = require('../models/role');
const { User } = require('../models/user');

const { filterUser } = require('../../../../../helper/user_helper');
const { userFormUpdateValidator } = require('../../../../../validator/user_validator');
const  { Op } = require("sequelize");


module.exports = function (app){

// GET    
app.get('/api/user',auth, async(req,res) => {
    // /api/user?id=64e0bc5bd3a9bc810be1f80c
 
    let id = req.query.id;
    try {
       const user = await User.findByPk(id);
       res.status(200).json(filterUser(user))
    } catch (err) {
        res.status(400).send(err);
    }
 
 });
 
 // 
 app.get('/api/users',auth,manager,async (req,res) => {
    // /api/users?skip=0&limit=2&order=ASC
    let skip =  parseInt(req.query.skip);
    let limit = parseInt(req.query.limit) ;
    let order = req.query.order ;
    const currentUser = req.user;
    let users = [];
    let nbusers = 0;

    try {

         if(currentUser.role === 'admin') {
            users= await User.findAll({where:{archive:0},order:[['id',order]], offset:skip, limit:limit });
            nbusers = await User.count();
         } 
         
         if(currentUser.role === 'manager') {
            users= await User.findAll({where: {archive:0, role:{
               [Op.in] : ['client', 'manager']},
               
               [Op.or] : [{createdBy:currentUser.id},{id:currentUser.id},{role:'client'}] },
             order:[['id',order]], offset:skip, limit:limit });

            nbusers = await User.count({where: {archive:0,role:{
               [Op.in] : ['client', 'manager']}, 
               [Op.or] : [{createdBy:currentUser.id},{id:currentUser.id}] }});
         }
        
         if (users && users.length) {
            users.map(user => filterUser(user));
         } 

         res.status(200).json({users,nbusers:nbusers});
        
     } catch (err) {
         console.log(err);
         res.status(400).send(err);
     }
 });

 app.get('/api/user/disable',auth,admin,async (req,res) => {
    // /api/user/disable?id=64e0bc5bd3a9bc810be1f80c
    try {

       let id = req.query.id;
       const user = await User.findOne({where: {id:id}});
       if (user instanceof User) {
            user.update({active : 0});
            await user.save();
            await user.reload();
      
            res.status(200).json({success:true, user:filterUser(user)});
       } else {
         res.status(400).json({success:false, user:filterUser(user)});
       }
     
    } catch (err) {
      console.log(err);
       res.status(400).send(err);
    }
 });

 app.get('/api/user/enable',auth,manager,async (req,res) => {
    // /api/user/enable?id=64e0bc5bd3a9bc810be1f80c
    try {
        let id = req.query.id;
        const user = await User.findOne({where: {id:id}});
       if (user instanceof User) {
            user.update({active : 1});
            await user.save();
            await user.reload();
         
            res.status(200).json({success:true, user:filterUser(user)});
       } else {
         res.status(400).json({success:false, user:filterUser(user)});
       }
     } catch (err) {
      console.log(err);
        res.status(400).send(err);
     }
 });


 app.get('/api/user/archive',auth,admin,async (req,res) => {
   // /api/user/enable?id=64e0bc5bd3a9bc810be1f80c
   try {
       let id = req.query.id;
       const user = await User.findOne({where: {id:id}});
      if (user instanceof User) {
           user.update({archive : 1, active:0});
           await user.save();
           await user.reload();
        
           res.status(200).json({success:true, user:filterUser(user)});
      } else {
        res.status(400).json({success:false, user:filterUser(user)});
      }
    } catch (err) {
     console.log(err);
       res.status(400).send(err);
    }
});


// UPDATE //
app.post('/api/user/update',auth,admin,userFormUpdateValidator,async (req,res) => {
    
   try {

       const userData = req.body;

       const user = await User.findByPk(req.body.id);
       if (user instanceof User) {
            user.set({
               // email:userData.email,
               lastname:userData.lastname,
               firstname:userData.firstname,
               accountNumber: userData.accountNumber,
               address:userData.address,
               role:userData.role,
               phone:userData.phone,
               canTransfer:userData.canTransfer
            });
            await user.save();
            await user.reload();
            res.status(200).json({success:true, user:filterUser(user)});
       } else {
         res.status(400).json({success:false, message:'user doesn\'t exist.'});
       }
    } catch (err) {
      console.log(err);
       res.status(400).send(err);
    }
 });

 // ,auth,admin
 app.post('/api/user/role',auth,admin,async (req,res) => {

   try {
      const role = await Role.create(req.body);
      if (role instanceof Role) {
         res.status(200).json({success:true,role});
      } else {
         res.status(200).json({success:false,message:'Failed to add a role.'});
      }
      
   } catch (err) {
      console.log(err);
      res.status(400).send(err);
   }

});

// 
app.get('/api/user/role',auth,manager,async (req,res) => {
   
   try {

      const currentUser = req.user;
      let roles = [];

      if (currentUser.role === 'admin') {
          roles = await Role.findAll({where:{slug:{[Op.ne]:'admin'},active:1},order:[['id','ASC']]});
      }

      if (currentUser.role === 'manager') {
         roles = await Role.findAll({where:{slug:'client',active:1},order:[['id','ASC']]});
      }

       res.status(200).send(roles);
      
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

// auth,admin,
app.post('/api/user/country',auth,manager,async (req,res) => {

   try {

      const country = await Country.create(req.body);
      if (country instanceof Country) {
         res.status(200).json({success:true,country});
      } else {
         res.status(400).json({success:false,message:'Failed to add a country.'});
      }
   
   } catch (err) {
      console.log(err);
      res.status(400).send(err);
   }

});


app.get('/api/user/country',async (req,res) => {
   try {
       const countries = await Country.findAll({where:{active:1},order:[['id','ASC']]});
       res.status(200).send(countries);
      
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});
 
}