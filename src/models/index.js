import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import sequelizeConfig from "../config/sequelize";

const basename = path.basename(__filename);
const db = {};

const {
  username,
  password,
  database,
  dialect,
  host,
  operatorsAliases,
  seederStorage,
  seederStorageTableName,
  logging
} = sequelizeConfig;

const sequelize = new Sequelize(database, username, password, {
  dialect,
  host,
  operatorsAliases,
  seederStorage,
  seederStorageTableName,
  logging
});

fs.readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
