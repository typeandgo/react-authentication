
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const client = redis.createClient();

function expressStore (app) {
  client.on('connect', function() { console.log('Redis client connected')});
  client.on('error', function (err) { console.log('Something went wrong ' + err)});
  
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
}

module.exports = expressStore;








