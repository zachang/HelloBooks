import express from 'express';
import logger from 'morgan';
import parser from 'body-parser';
import routes from './server/routes/index';

const dotenv = require('dotenv');

dotenv.config();

const app = express();
const router = express.Router();
const port = parseInt(process.env.PORT, 10) || 8000;

routes(router);

app.set('port', port);

app.use(logger('dev'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

// app.use('/', (req, res) => res.status(200).send({
//   message: 'Welcome to the hellobooks',
// }));

app.use('/api/v1/', router);

app.get('*', (req, res) => res.status(404).send({
  message: 'Welcome to the hellobooks',
}));

app.listen(port, () => console.log(`Port running at ${port}`));

export default app;
