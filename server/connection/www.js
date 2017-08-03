const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const port = parseInt(process.env.PORT, 10) || 8000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning HelloBooks',
}));


app.listen(port, () => console.log(`Port running at ${port}`));