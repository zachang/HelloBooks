const usersController = require('../controllers').users;

module.exports = (app) => {
    app.get('/api/users', (req, res) => res.status(200).send({
        message: 'Welcome to the Users API!',
    }));

    app.post('/api/users/signup', usersController.create);
};