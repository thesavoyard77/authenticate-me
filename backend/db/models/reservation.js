'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    userId: DataTypes.INTEGER,
    propertyId: DataTypes.INTEGER,
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
    totalPrice: DataTypes.DECIMAL(10, 2)
  }, {});
  Reservation.associate = function(models) {
    // associations can be defined here
    Reservation.belongsTo(models.Property, { foreignKey: 'propertyId'})
    Reservation.belongsTo(models.User, { foreignKey: 'userId'})
  };
  return Reservation;
};
