
// index.js
const sequelize = require('../config/connection');
const seedSkill = require('./skillData');
const seedTutor = require('./tutorData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

 const res1 = await seedSkill();
console.log(res1);
 const res2 = await seedTutor();

  process.exit(0);
};

seedAll();
