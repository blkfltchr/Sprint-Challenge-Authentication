const axios = require('axios');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');
const jwt = require('jsonwebtoken');

const { authenticate, generateToken } = require('./middlewares');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
  server.get('/api/users', getUsers);
};

function register(req, res) {
  // implement user registration
  const user = req.body;
	const hash = bcrypt.hashSync(user.password, 10); // Auto-gen a salt and hash
	user.password = hash; // store hash in password DB

    db('users') // go into users
        .insert(user) // insert the new user ( with hashed pw)
        .then(ids => {
            db('users')
                .where({ id: ids[0] }) // find the appropriate user
                .first() // the first one
                .then(user => {
                const token = generateToken(user); // generate the token
                    res.status(201).json(token); // return new token
                });
        })
        .catch(err => {
            res.status(500).json(err); // throw err if it fails
        });
}

function login(req, res) {
  // implement user login
  const credentials = req.body;

    db('users') // go into users
        .where({username: credentials.username}) // find the user by username
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(credentials.password, user.password)) { // compare the found user's pw to the pw in the db
                const token = generateToken(user); // generate the token
                res.send(token) // return the token
            } else {
                res.status(401).json({ error: 'You shall not pass'}) // throw this error if the pw doesn't match
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
}

function getUsers(req, res) {
  db('users')
      .then(users => {
          res.status(200).json(users);
      })
      .catch(err => res.status(500).json(err));
};

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
