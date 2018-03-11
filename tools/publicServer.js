import express from 'express';
import path from 'path';
import compression from 'compression';
import bodyParser from 'body-parser';
import morganLogger from 'morgan';
import winston from 'winston';
import dotenv from 'dotenv';
import swaggerJSDoc from 'swagger-jsdoc';
import routes from '../server/routes/index';

dotenv.config();

const port = parseInt(process.env.PORT, 10) || 8000;
const app = express();

// Create winston logger
const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ colorize: true })
  ]
});

// swagger definition
const swaggerDefinition = {
  info: {
    title: 'HelloBooks API',
    version: '1.0.0',
    description: 'Web App for a Library',
  },
  host: process.env.API_HOST,
  basePath: '/',
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: [path.join(__dirname,'../server/routes/*.js')],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

const router = express.Router();

routes(router);

// serve api doc
app.get('/api/doc/hellobooks.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use(morganLogger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use('/api/doc', express.static(path.join(__dirname, '../server/public/api-doc')));
app.use(express.static('production'));

app.use('/api/v1/', router);

app.get('/api/v1/*', (req, res) => res.status(404).send({
  message: 'Invalid route',
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../production/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    return logger.error(err);
  }
  logger.info('app running on port', port);
});