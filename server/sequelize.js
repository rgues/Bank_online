const { Sequelize, Model, DataTypes } = require("sequelize");
const config =  require('./config/config').get(process.env.NODE_ENV);


const sequelize = new Sequelize(`${config.DATABASE}`, `${config.USERNAME}`, `${config.PASSWORD}`, {
  host: `${config.HOST}`,
  port:`${config.MARIADB_PORT}`,
  dialect: `${config.DIALECT}`
});

  module.exports = {sequelize,Sequelize, Model,DataTypes};
  