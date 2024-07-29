require("dotenv").config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

var config = {
  development: {
    dialect: "sqlite",
    storage: "./db/development.sqlite",
  },
  production: {
    username: PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
    host: PGHOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true,
      },
    },
    connection: {
      options: `project=${ENDPOINT_ID}`,
    },
  },
};

module.exports = config;
