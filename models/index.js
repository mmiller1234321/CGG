const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

// Define Skill model
class Skill extends Model {}

Skill.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'skill',
  }
);

// Define Tutor model
class Tutor extends Model {}

Tutor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    jobTitle: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'tutor',
  }
);

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

module.exports = { Tutor, Skill, SkillTutor };
