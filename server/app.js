import express from 'express';
import logger from 'morgan';
import parser from 'body-parser';
import path from 'path';
import routes from './routes/index';

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

app.use(express.static('../client/public'));
app.use('/api/v1/', router);

app.get('/api/v1/*', (req, res) => res.status(404).send({
  message: 'Invalid location',
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});


app.listen(port, () => console.log(`Port running at ${port}`));

export default app;
