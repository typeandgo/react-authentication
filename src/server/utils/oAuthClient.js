const fetch = require('node-fetch');


class OAuthClient {

  authenticate () {

  }

  request (...args) {
    console.log('Request args: ', args);

    return fetch.apply(fetch, args);
  }

  isDateValid (date) {
    const bufferTime = 10000; //ms
    const comparaDate = parseInt(date) - bufferTime;
    const newDate = new Date();
    const currentDate = newDate.getTime();
  
    return (comparaDate > currentDate) ? true : false;
  }
}

module.exports = OAuthClient;

/*

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

module.exports = authCheck;

const authCheck = function (req, res, next) {

  const isAuth = req.session.isAuth;
  const token = req.session.token;
  const { accessToken, refreshToken, accessTokenExpireDate, refreshTokenExpireDate } = token;

  // Access Token Geçerli mi?

    // Geçerli
    if (accessToken && accessTokenExpireDate && isDateValid(accessTokenExpireDate)) {
      console.log('Access Token Valid');
      // Next öncesi işlemler
      next();
    }

    // Geçersiz
    if (accessToken && accessTokenExpireDate && !isDateValid(accessTokenExpireDate)) {
      
      if (refreshToken && refreshTokenExpireDate && isDateValid(refreshTokenExpireDate)) {
        // get new access token
        // access token
      }
    }
      // Refresh Token Geçerli mi?
        // Geçerli
        // Yeni token Al
        // next();
        
        // Geçersiz
        // res.status(403).send('Unauthenticated User!');
  
  //next() öncesi
  // access token bilgisini req.header'a set et.


  console.log('isAuth: ', isAuth);
  console.log('hello there!');

  if (isAuth === 'AUTHENTICATED') {
    next();
  }

*/