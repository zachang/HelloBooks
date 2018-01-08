import path from 'path';
import express from 'express';
import logger from 'morgan';
import parser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import routes from './routes/index';

const dotenv = require('dotenv');

dotenv.config();

const app = express();

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
  apis: ['./server/routes/*.js'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

const router = express.Router();
const port = parseInt(process.env.PORT, 10) || 8000;

routes(router);

app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.set('port', port);

app.use(logger('dev'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, './public')));

app.use('/api/v1/', router);

app.get('/api/v1/*', (req, res) => res.status(404).send({
  message: 'Invalid route',
}));

app.listen(port, () => console.log(`Port running at ${port}`));

export default app;
