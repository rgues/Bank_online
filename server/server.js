const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const { sequelize } = require('./sequelize');

const cors = require('cors');

(async() => {

// Import Model
require('./controllers/api/v0/user/index.model');
require('./controllers/api/v0/wallet/index.model');

console.debug("Initialize database connection...");
await sequelize.sync();

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.use(bodyParser.json());
app.use(cookieParser());

// Run this code in production serve static files on the server
app.use(express.static('client/build'));


// Allow rquest from different domain
app.use(cors({
   allowedHeaders: [
     'Origin', 'X-Requested-With',
     'Content-Type', 'Accept',
     'X-Access-Token', 'Authorization',
   ],
   methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
   preflightContinue: true,
   origin: '*',
 }));


// Import routes from files
  require('./controllers/api/v0/auth/routes/auth.router')(app);
  require('./controllers/api/v0/user/routes/user.router')(app);
  require('./controllers/api/v0/wallet/routes/wallet.router')(app);


  // If route not found start front application 
  if(process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.get('/*',(req,res) => {
          res.sendFile(path.resolve(__dirname,'../client','build','index.html'));
    });
}

const port = process.env.PORT || 3001;
app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});

})();