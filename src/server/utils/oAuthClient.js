const fetch = require('node-fetch');
const { fromJS } = require('immutable');

class OAuthClient {

  constructor (req) {

    //console.log('REQ: ', req);

    // Expired access token
    this.token = {
      accessToken: "abc",
      refreshToken: "xyz",
      accessTokenExpireDate: "1544500620000",
      refreshTokenExpireDate: "1546259400000"
    };

    /*
    // Valid access token
    this.token = {
      accessToken: "abc",
      refreshToken: "xyz",
      accessTokenExpireDate: "1544877000000",
      refreshTokenExpireDate: "1546259400000"
    };
    */
  }

  fetchTokenWithRefreshToken (refreshToken) {
    const _this = this;

    return new Promise (
      function (resolve, reject) {
        fetch('http://localhost:3001/api/users/auth/refresh', {
          method: 'post',
          body: JSON.stringify(_this.refreshToken),
          headers: { 'Content-Type': 'application/json' }
        })
        .then(result => result.json())
        .then(body => {
            _this.token = {
              accessToken: "def",
              refreshToken: "wsx",
              accessTokenExpireDate: "1544877000000",
              refreshTokenExpireDate: "1546259400000"
            };

            resolve(true);
          }
        );
      }
    )
  }
  

  authenticate () {
    const _this = this;

    return new Promise (
      function (resolve, reject) {
        const { accessToken, refreshToken, accessTokenExpireDate, refreshTokenExpireDate } = _this.token;
    
        if (accessToken && accessTokenExpireDate && !_this.isDateValid(accessTokenExpireDate)) {
            console.log('Access Token Expired');
          
          if (refreshToken && refreshTokenExpireDate && _this.isDateValid(refreshTokenExpireDate)) {
            console.log('Get New Access Token')

            _this.fetchTokenWithRefreshToken(refreshToken).then(() => resolve(true));

          } else {
            console.log('Access Token && Refresh Token Expired || Token Object Doesnt Exist!');
            const error = new Error('User Not Authenticated!');
            reject(error);
          }
        }
    
        if (accessToken && accessTokenExpireDate && _this.isDateValid(accessTokenExpireDate)) {
          console.log('Access Token Valid');
          resolve(true)
        }
      }
    )
  }


  request (...args) {
    const { accessToken, refreshToken, accessTokenExpireDate, refreshTokenExpireDate } = this.token;

   
    if (accessToken && refreshToken && !this.isDateValid(accessTokenExpireDate) && this.isDateValid(refreshTokenExpireDate)) {

      return this.authenticate().then(() => this.request(...args));

    } else {
      // 'User Not Authenticated!'
    }
  
    if (accessToken && accessTokenExpireDate && this.isDateValid(accessTokenExpireDate)) {
      console.log('Valid Access Token: ', accessToken);
      console.log('Access Token Expire Date: ', this.milisecondsToDate(accessTokenExpireDate));
      console.log('Fetch Url: ', args[0]);
      console.log('Fetch Parameters: ', args[1]);

      if (args[1] === undefined) {
        args[1] = {
          headers: {
            "X-Auth-Token": accessToken
          }
        };
      } else {
        args[1] = fromJS(args[1]).mergeDeep(fromJS({
          headers: {
            "X-Auth-Token": accessToken
          }
        })).toJS();
      };

      return fetch.apply(fetch, args);
    }
  }

  isDateValid (date) {
    const bufferTime = 10000; //ms
    const comparaDate = parseInt(date) - bufferTime;
    const newDate = new Date();
    const currentDate = newDate.getTime();
    return (comparaDate > currentDate) ? true : false;
  }

  milisecondsToDate (miliseconds) {
    const dateValue = new Date(parseInt(miliseconds));
    return dateValue.toString();
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