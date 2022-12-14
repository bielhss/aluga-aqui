'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuario.hasMany(models.Reserva)
      Usuario.hasMany(models.Post)
    }
  }
  Usuario.init({
    nome: DataTypes.STRING,
    telefone: DataTypes.STRING,
    senha: DataTypes.STRING,
    foto: DataTypes.STRING,
    dataNascimento: DataTypes.DATEONLY,
    locador: DataTypes.BOOLEAN,
    facebook: DataTypes.STRING,
    whatsapp: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};