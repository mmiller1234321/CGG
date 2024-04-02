const { Skill } = require('../models');

const skillData = [
  {
    name: "HTML",
  },
  {
    name: "CSS",
  },
  {
    name: "JavaScript",
  },
  {
    name: "React",
  },
  {
    name: "Node.js",
  },
  {
    name: "Python",
  },
  {
    name: "SQL",
  },
  // Add more skills as needed
];

const seedSkills = () => Skill.bulkCreate(skillData);

module.exports = seedSkills;