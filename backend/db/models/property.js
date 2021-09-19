'use strict';
module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define('Property', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL(7, 2)
  }, {});
  Property.associate = function(models) {
    // associations can be defined here
    Property.hasMany(models.Reservation, { foreignKey: 'propertyId'})
    Property.belongsTo(models.User, { foreignKey: 'userId' })
    Property.hasMany(models.Image, { foreignKey: 'propertyId'})
  };
  return Property;
};
