const dotenv = require('dotenv');

dotenv.config();

const config = {
  production: {
    use_env_variable: 'DATABASE_URL',
    protocol: 'postgres',
    database: process.env.DB_NAME,
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
    database: 'hellobooks_test',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
