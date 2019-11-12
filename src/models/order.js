import {
  ENUM_ORDER_STATUS_TAKEN,
  ENUM_ORDER_STATUS_UNASSIGNED
} from "../constants";
import { googleMapsClient } from "../services";

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class Order extends Model {
    async getDistance() {
      return googleMapsClient
        .distanceMatrix({
          origins: [this.origin],
          destinations: [this.destination],
          units: "metric"
        })
        .asPromise();
    }

    get destinationCoordinate() {
      const parsedDestination = this.getDataValue("destination").split(",");
      return {
        lat: parsedDestination[0],
        long: parsedDestination[1]
      };
    }

    set destinationCoordinate(coordinateObject) {
      const { lat, long } = coordinateObject;
      this.setDataValue("destination", `${lat},${long}`);
    }

    get originCoordinate() {
      const parsedDestination = this.getDataValue("origin").split(",");
      return {
        lat: parsedDestination[0],
        long: parsedDestination[1]
      };
    }

    set originCoordinate(coordinateObject) {
      const { lat, long } = coordinateObject;
      this.setDataValue("origin", `${lat},${long}`);
    }
  }

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
