'use strict';
module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define('Property', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER
  }, {});
  Property.associate = function(models) {
    // associations can be defined here
  };
  return Property;
};