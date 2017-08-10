const dotenv = require('dotenv');

dotenv.config();

const config = {
  production: {
    username: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DATABASE_URL,
    port: 5432,
    dialect: 'postgres'
  },
  development: {
    username: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: process.env.DB_NAME,
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.PASSWORD,
    database: 'database_test',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
