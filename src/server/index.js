const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const client = redis.createClient();
const app = express();
const authCheck = require('./middlewares/AuthCheck');

client.on('connect', function() { console.log('Redis client connected')});

client.on('error', function (err) { console.log('Something went wrong ' + err)});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(session({
  secret: 'THIS IS SECRET',
  store: new redisStore({
    host: 'localhost',
    port: 6379,
    client: client,
    ttl: 86400 // 1 Day
  }),
  saveUninitialized: false,
  resave: false
}));

app.use(authCheck);

app.get('/api/users/auth', (req, res) => {
  res.json({
    isAuth: req.session.isAuth,
    token: req.session.token
  });
});

app.post('/api/users/auth/login', (req, res) => {
  // BE API

  const token = {
    accessToken: "abc",
    refreshToken: "xyz",
    accessTokenExpireDate: "1544500620000",
    refreshTokenExpireDate: "1546259400000"
  };

  req.session.isAuth = 'AUTHENTICATED';
  req.session.token = token;

  res.json({
    isAuth: 'AUTHENTICATED',
    token
  });
});

app.get('/api/users/auth/logout', (req, res) => {
  // BE API

  const token = {};

  req.session.isAuth = 'UNAUTHENTICATED';
  req.session.token = token;


  res.json({
    isAuth: 'UNAUTHENTICATED',
    token
  });
});

app.post('/api/users/auth/refresh', (req, res) => {
  res.json({
    token: 'hede token'
  });
});

app.get('/api/users', (req, res) => {
  req.oAuthClient.request('http://localhost:3001/api/userProfile')
    .then( result => {
      return result.json();
    })
    .then( json => {
      console.log('Fetch Response: ', json);
      return res.json(json)
    })
    .catch(error => {
      console.log("Express Fetch Error: ", error);
      return res.status(500).send(error.message);
    });
});

//--------------------------------------------
// SIMULATED BE SERVICE
app.get('/api/userProfile', (req, res) => {
  res.json({
    userId: '1234567890',
    firstName: 'Engin',
    lastName: 'Öztürk',
    segment: 'A1',
    balance: '1.290,00',
    birthDate: '13-05-1983',
    team: '104',
    theme: null
  });
});

const port = 3001;

app.listen(port, () => {  console.log(`Server started on port ${port}`) });
