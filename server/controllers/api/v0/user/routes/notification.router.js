
const { admin } = require('../../../../../middleware/admin');
const { auth } = require('../../../../../middleware/auth');
const { Notification } = require('../models/notification');

// const  { Op } = require("sequelize");


module.exports = function (app){

// GET    
app.get('/api/notification',auth, async(req,res) => {
    // /api/notification?id=64e0bc5bd3a9bc810be1f80c
 
    let id = req.query.id;
    try {
       const notifs = await Notification.findOne({where:{userId:id}});
       res.status(200).json(notifs)
    } catch (err) {
        res.status(400).send(err);
    }
 
 });
 
 // 
 app.get('/api/notifications',auth, admin,async (req,res) => {
    // /api/users?skip=0&limit=2&order=ASC
    let skip =  parseInt(req.query.skip);
    let limit = parseInt(req.query.limit) ;
    let order = req.query.order ;
    const currentUser = req.user;
    let notifs = [];
    let nbnotifs = 0;

    try {

         if(currentUser.role === 'admin') {
            notifs= await Notification.findAll({where:{active:1},order:[['id',order]], offset:skip, limit:limit });
            nbnotifs = await Notification.count();
         } 
    

         res.status(200).json({notifications,nbnotifs:nbnotifs});
        
     } catch (err) {
         console.log(err);
         res.status(400).send(err);
     }
 });

 app.get('/api/notif/disable',auth,admin,async (req,res) => {
    // /api/notif/disable?id=64e0bc5bd3a9bc810be1f80c
    try {

       let id = req.query.id;
       const notif = await Notification.findOne({where: {id:id}});
       if (notif instanceof Notification) {
            notif.update({active : 0});
            await notif.save();
            await notif.reload();
      
            res.status(200).json({success:true, notif});
       } else {
         res.status(400).json({success:false, notif});
       }
     
    } catch (err) {
      console.log(err);
       res.status(400).send(err);
    }
 });

 app.get('/api/notif/enable',auth,admin,async (req,res) => {
    // /api/notif/enable?id=64e0bc5bd3a9bc810be1f80c
    try {
        let id = req.query.id;
        const notif = await Notification.findOne({where: {id:id}});
       if (notif instanceof Notification) {
        notif.update({active : 1});
            await notif.save();
            await notif.reload();
         
            res.status(200).json({success:true, notif});
       } else {
         res.status(400).json({success:false, notif});
       }
     } catch (err) {
      console.log(err);
        res.status(400).send(err);
     }
 });

// UPDATE //
app.post('/api/notif/update',auth,admin,async (req,res) => {
    
   try {

       const notifData = req.body;

       const notif = await Notification.findByPk(req.body.id);
       if (notif instanceof Notification) {
        notif.set({
               title:notifData.title,
               type:notifData.type,
               time: notifData.time,
               delay:notifData.delay,
               active:notifData.active,
               description:notifData.description
            });
            await notif.save();
            await notif.reload();
            res.status(200).json({success:true, notif});
       } else {
         res.status(400).json({success:false, message:'notification doesn\'t exist.'});
       }
    } catch (err) {
      console.log(err);
       res.status(400).send(err);
    }
 });


}