import {
  ENUM_ORDER_STATUS_TAKEN,
  ENUM_ORDER_STATUS_UNASSIGNED
} from "../constants";

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class Order extends Model {}

  Order.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      origin: {
        allowNull: false,
        type: DataTypes.STRING
      },
      destination: {
        allowNull: false,
        type: DataTypes.STRING
      },
      distance: {
        type: DataTypes.DECIMAL(23, 4)
      },
      status: {
        type: DataTypes.ENUM,
        values: [ENUM_ORDER_STATUS_TAKEN, ENUM_ORDER_STATUS_UNASSIGNED]
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      deletedAt: {
        type: DataTypes.DATE
      }
    },
    { sequelize, modelName: "Order", paranoid: true }
  );

  return Order;
};
