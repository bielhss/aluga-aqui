'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.hasMany(models.Foto)
      Post.belongsTo(models.Usuario)
      Post.hasMany(models.Reserva)
    }
  }
  Post.init({
    nome: DataTypes.STRING,
    endereco: DataTypes.STRING,
    detalhes: DataTypes.STRING,
    dormitorio: DataTypes.INTEGER,
    banheiro: DataTypes.INTEGER,
    capacidade: DataTypes.INTEGER,
    diaria: DataTypes.DECIMAL,
    cor: DataTypes.STRING,
    usuarioId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};