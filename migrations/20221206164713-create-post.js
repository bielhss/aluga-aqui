'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      endereco: {
        type: Sequelize.STRING
      },
      detalhes: {
        type: Sequelize.STRING
      },
      dormitorio: {
        type: Sequelize.INTEGER
      },
      banheiro: {
        type: Sequelize.INTEGER
      },
      capacidade: {
        type: Sequelize.INTEGER
      },
      diaria: {
        type: Sequelize.DECIMAL
      },
      cor: {
        type: Sequelize.STRING
      },
      usuarioId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Usuarios',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};