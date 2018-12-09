const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const client = redis.createClient();
const app = express();

app.use(bodyParser.urlencoded());

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

app.get('/', (req, res) => {
  if (req.session.page_views) {
    req.session.page_views++;
    res.send(`You visited this page ${req.session.page_views} times`);
  } else {
    req.session.page_views = 1;
    res.send(`Welcome to this page for the first time`);
  }
});

app.get('/api/users/auth', (req, res) => {
  res.json({
    isAuth: 'AUTHENTICATED'
  });
});

app.post('/api/users/auth/login', (req, res) => {
  res.json({
    isAuth: 'AUTHENTICATED'
  });
});

app.get('/api/users/auth/logout', (req, res) => {
  res.json({
    isAuth: 'UNAUTHENTICATED'
  });
});

app.get('/api/users/auth/refresh', (req, res) => {
  res.send('Refresh Token Service');
});

app.get('/api/users', (req, res) => {
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
