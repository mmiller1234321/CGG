const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        
        host: 'localhost',
        dialect: 'postgres',
        port: 5432,
      }
    );

    /*
const sequelize = new Sequelize('cgg_db', 'root', 'Swabi1234', {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    decimalNumbers: true,
  },
});
*/

module.exports = sequelize;