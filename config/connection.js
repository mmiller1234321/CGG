const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        // host: 'dpg-co1dfn7jbltc7396en30-a',
        host: 'localhost',
        dialect: 'postgres',
        port: 5432,
      }
    );

module.exports = sequelize;