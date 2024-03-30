
// index.js
const sequelize = require('../config/connection');
const seedSkill = require('./skillData');
const seedTutor = require('./tutorData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedSkill();

  await seedTutor();

  process.exit(0);
};

seedAll();
