import {
  SQL_DATABASE,
  SQL_DIALECT,
  SQL_HOST,
  SQL_OPERATOR_ALIASES,
  SQL_PASSWORD,
  SQL_SEEDER_STORAGE,
  SQL_SEEDER_STORAGE_TABLE_NAME,
  SQL_USERNAME
} from ".";
import { logger } from "../utils";

const logging = log => {
  logger.info(log);
};

export default {
  username: SQL_USERNAME,
  password: SQL_PASSWORD,
  database: SQL_DATABASE,
  dialect: SQL_DIALECT,
  host: SQL_HOST,
  operatorsAliases: SQL_OPERATOR_ALIASES,
  seederStorage: SQL_SEEDER_STORAGE,
  seederStorageTableName: SQL_SEEDER_STORAGE_TABLE_NAME,
  logging
};
