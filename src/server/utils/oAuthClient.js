const fetch = require('node-fetch');
const { fromJS } = require('immutable');
const config = require('../../config');

class OAuthClient {
  constructor (req, res) {
    this.token = {};
  }

  fetchTokenWithRefreshToken (refreshToken) {
    const _this = this;

    return new Promise (
      function (resolve, reject) {
        fetch(config.bffRootPath + config.bffRefreshToken, {
          method: 'post',
          body: JSON.stringify({ token: refreshToken }),
          headers: { 'Content-Type': 'application/json' }
        })
        .then(result => result.json())
        .then(json => {
            _this.token = json.token;
            resolve(true);
          }
        ).catch(error => { console.log("Fetch Error: ", error)});
      }
    )
  }

  authenticate () {
    const _this = this;

    return new Promise (
      function (resolve, reject) {
        const { accessToken, refreshToken, accessTokenExpireDate, refreshTokenExpireDate } = _this.token;

        console.log('authenticate TOKEN: ', _this.token);

        if (accessToken && refreshToken && accessTokenExpireDate && refreshTokenExpireDate && _this.isDateValid(refreshTokenExpireDate)) {

          if (_this.isDateValid(accessTokenExpireDate)) {
    
            console.log('Access Token Valid');
            resolve(true)

          } else {

            console.log(`Access Token "${accessToken}" expired on "${_this.milisecondsToDate(accessTokenExpireDate)}"`);
            console.log('Get New Access Token');
  
            _this.fetchTokenWithRefreshToken(refreshToken).then(() => resolve(true)); 
          }
        } else {

          console.log('Token Doesn`t Exist or Expired!');
          reject({ message: 'Token Doesn`t Exist or Expired!' });
        }
      }
    )
  }

  request (...args) {
    this.token = args[2];
    const { accessToken, refreshToken, accessTokenExpireDate, refreshTokenExpireDate } = this.token;
   
    if (accessToken && refreshToken && !this.isDateValid(accessTokenExpireDate) && this.isDateValid(refreshTokenExpireDate)) {
      
      return this.authenticate()
      .then(() => this.request(...args))
      .catch(error => { 
        console.log("Authentication Error: ", error);
        return Promise.reject({
          status: 403,
          message: error.message
        });
      });

    } else {
  
      if (accessToken && accessTokenExpireDate && this.isDateValid(accessTokenExpireDate)) {
        console.log(`Current Date: ${ new Date() }`)
        console.log(`Access token "${accessToken}" will expire at "${this.milisecondsToDate(accessTokenExpireDate)}"`);
        console.log(`Refresh token "${refreshToken}" will expire at "${this.milisecondsToDate(refreshTokenExpireDate)}"`);
        console.log(`Fetching to "${args[0]}" with these arguments "${JSON.stringify(args[1])}"`);
  
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
        
      } else {

        return this.authenticate()
        .then(() => this.request(...args))
        .catch(error => { 
          console.log("Authentication Error: ", error);
          return Promise.reject({
            status: 403,
            message: error.message
          });
        });
      }
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
