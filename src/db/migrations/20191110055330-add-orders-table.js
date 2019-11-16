import {
  ENUM_ORDER_STATUS_TAKEN,
  ENUM_ORDER_STATUS_UNASSIGNED
} from "../../constants";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Orders",
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4
        },
        origin: {
          allowNull: false,
          type: Sequelize.STRING
        },
        destination: {
          allowNull: false,
          type: Sequelize.STRING
        },
        distance: {
          type: Sequelize.DECIMAL(23, 4)
        },
        status: {
          type: Sequelize.ENUM,
          values: [ENUM_ORDER_STATUS_TAKEN, ENUM_ORDER_STATUS_UNASSIGNED]
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        deletedAt: {
          type: Sequelize.DATE
        }
      },
      {
        paranoid: true
      }
    );
  },
  down: async queryInterface => {
    await queryInterface.dropTable("Orders");
  }
};
