const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');
const Skill = require('./Skill');
const Tutor = require('./Tutor');
const User = require('./User');


// Define SkillTutor model for associations
class SkillTutor extends Model {}

SkillTutor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize,
    modelName: 'skill_tutor',
  }
);

// Define associations
Skill.belongsToMany(Tutor, { through: SkillTutor });
Tutor.belongsToMany(Skill, { through: SkillTutor });

module.exports = { User, Tutor, Skill, SkillTutor };
