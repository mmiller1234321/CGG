
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class Tutor extends Model {}

Tutor.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
  },
  {
    sequelize,
    modelName: 'Tutor',
    timestamps: false // Assuming you don't want timestamps for this model
  }
);

module.exports = Tutor;
