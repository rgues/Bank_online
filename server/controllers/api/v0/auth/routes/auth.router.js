const { User } = require('../../user/models/user');
const { auth } = require('../../../../../middleware/auth');
const { filterUser, isPassword } = require('../../../../../helper/user_helper');
const { userFormValidator } = require('../../../../../validator/user_validator');
const SALT_I = 10;
const bcrypt = require('bcryptjs');
const { manager } = require('../../../../../middleware/manager');


module.exports = function (app) {

   // 
   app.get('/api/auth',auth, (req, res) => {

      try {
         res.json({
            isAuth: true,
            id: req.user.id,
            email: req.user.email,
            firstname: req.user.firstname,
            lastname: req.user.lastname,
            role: req.user.role,
            canTransfer: req.user.canTransfer
         })
      } catch (err) {
         console.log(err);
         res.status(400).send(err);
      }
 
   });

   app.get('/api/logout', auth, (req, res) => {

      try {
         req.user.deleteToken(req.token, (err, user) => {
            if (err) return res.status(400).send(err);
            res.sendStatus(200);
         })

      } catch(err) {
            console.log(err);
            res.status(400).send(err);
      }
   });

   // 
   app.post('/api/register',auth,manager,userFormValidator,async (req, res) => {

   try {

      const userData = req.body;
      const userId = req.user.id;

         const user = await User.create({
            firstname:userData.firstname,
            lastname:userData.lastname,
            phone:userData.phone,
            address:userData.address,
            accountNumber:userData.accountNumber,
            role:userData.role,
            email:userData.email, 
            password:userData.password,
            createdBy: userId
         });

         
         if (user instanceof User) {
            await user.reload();
            res.status(200).json({
               success: true,
               user: filterUser(user)
            });
         } else {
            res.status(400).json({success: false,message: 'Parameter not found !'});
         }
     
      } catch (err) {
         console.log(err);
         res.status(400).json({
            success: false,
            message: 'Failed to add the user !'
         });
      }

   });

   app.post('/api/login', async (req, res) => {
      try {
         const user = await User.findOne({where : { email: req.body.email }});

         if (!user) return res.json({ isAuth: false, message: 'Auth failed, email not found' });

         if (!user.isActive()) return res.json({ isAuth: false, message: 'Auth failed, user is blocked' });

         user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) return res.status(400).send(err);
            if (!isMatch) return res.json({ isAuth: false, message: 'Wrong password' });
            // generate token and send response to client 

            user.generateToken((err, user) => {
               if (err) return res.status(400).send(err);
               res.cookie('authToken', user.token).json({
                  isAuth: true,
                  id: user.id,
                  email: user.email
               })

            });
         });

      } catch (err) {
         console.log(err);
         res.status(400).json({
            isAuth: false,
            message: 'Failed to login the user !'
         });
      }
   });


   app.post('/api/update/password',auth,manager, async (req, res) => {
      try {
         const user = req.user;

         user.comparePassword(req.body.password, async (err, isMatch) => {
            if (err) return res.status(400).send(err);
            if (!isMatch) return res.json({ success: false, message: 'Wrong password' });

            if (!isPassword(req.body.new_password)) return res.json({ success: false, message: 'Password must have at least 6 digits.' });
            // vefify the password
            if(req.body.new_password) {
               bcrypt.genSalt(SALT_I, function(err,salt) {
                   if(err) return res.status(400).send(err);
                   bcrypt.hash(req.body.new_password,salt, async function(err,hash) {
                       if(err) return res.status(400).send(err);
                       user.password = hash;
                       await user.save();
                       return res.json({ success: true, message: 'Password successfully updated. Please login again !' });
                   });
               });
            } else {
               return res.json({ success: false, message: 'Password is required' });
            }

         });

      } catch (err) {
         res.status(400).json({
            isAuth: false,
            message: 'Failed to update the password'
         });
      }
   });


}