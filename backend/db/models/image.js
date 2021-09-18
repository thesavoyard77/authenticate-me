'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    imageUrl: DataTypes.STRING,
    propertyId: DataTypes.INTEGER
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
    Image.belongsTo(models.Property, { foreignKey: 'propertyId'})
  };
  return Image;
};
