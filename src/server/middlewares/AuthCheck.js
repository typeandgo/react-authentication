const express = require('express');
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const client = redis.createClient();
const app = express();

const authCheck = function (req, res, next) {

  console.log('hello there!');

  next();
}

module.exports = authCheck;