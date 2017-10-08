import express from 'express';
import logger from 'morgan';
import parser from 'body-parser';
import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import routes from './routes/index';

const dotenv = require('dotenv');

dotenv.config();

const app = express();

// swagger definition
const swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'Demonstrating how to describe a RESTful API with Swagger',
  },
  host: 'localhost:8000',
  basePath: '/api/v1',
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./server/routes/*.js'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

const router = express.Router();
const port = parseInt(process.env.PORT, 10) || 8000;

routes(router);

app.set('port', port);

app.use(logger('dev'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

// app.use('/uploads/', express.static(path.join(__dirname, './public/uploads')));
app.use(express.static('../client/src'));

app.use('/api/v1/', router);

app.get('/api/v1/*', (req, res) => res.status(404).send({
  message: 'Invalid route',
}));

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/src/build/index.html'));
});

app.listen(port, () => console.log(`Port running at ${port}`));

export default app;
