const { Sequelize } = require('sequelize');
require('dotenv').config();

const database_name = process.env.DB_NAME;
const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database_host = process.env.DB_HOST;
const database_port = process.env.DB_PORT;

const sequelize = new Sequelize(database_name, username, password, {
    host:database_host,
    dialect: 'mysql',
    port:database_port
  });

  async function testConnection() {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  
  
  
testConnection();
  
module.exports = sequelize;

