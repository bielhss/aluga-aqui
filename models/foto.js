'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Foto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Foto.init({
    path: DataTypes.STRING,
    postId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Foto',
  });
  return Foto;
};