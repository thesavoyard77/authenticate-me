'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reservation = sequelize.define('Reservation', {
    userId: DataTypes.INTEGER,
    propertyId: DataTypes.INTEGER,
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY,
    totalPrice: DataTypes.DECIMAL(7, 2)
  }, {});
  Reservation.associate = function(models) {
    // associations can be defined here
  };
  return Reservation;
};