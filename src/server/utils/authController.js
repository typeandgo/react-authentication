import fetch from 'node-fetch';
import { fromJS } from 'immutable';
import colors from 'colors';
import config from '../../config';
import authorizationKey from './authorizationKey';
import serializeJson from './serializeJson';
import { milisecondsToDate } from './converters';

class authController {

  constructor (user) {
    this.user = user || {};
  }

  _fetchTokenWithRefreshToken (refreshToken) {
    const _this = this;

    return new Promise ( (resolve, reject) => {

      const options = {
        method: 'post',
        body: serializeJson({ token: refreshToken }),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'Authorization': authorizationKey
        }
      };

      fetch(config.apiRefreshTokenUrl, options)
        .then(resp => resp.json())
        .then(body => {
            _this.user = body;
            resolve(true);
          }
        )
        .catch(error => console.log("FETCH ERROR: ", `${error}`.red));
    })
  }

  _authenticate () {
    const _this = this;

    return new Promise((resolve, reject) => {
      const { accessToken, refreshToken, accessTokenExpireDate, refreshTokenExpireDate } = _this.user;

      if (accessToken && refreshToken && accessTokenExpireDate && refreshTokenExpireDate && _this._isDateValid(refreshTokenExpireDate)) {

        if (_this._isDateValid(accessTokenExpireDate)) {
  
          console.log('Access Token is Valid');
          resolve(true)

        } else {

          console.log(`Access Token `, `${accessToken}`.cyan, ` expired on `, `${milisecondsToDate(accessTokenExpireDate)}`.cyan);
          console.log('Get New Access Token');

          _this._fetchTokenWithRefreshToken(refreshToken).then(() => resolve(true)); 
        }
      } else {

        reject({ status: 403, message: 'Token Doesn`t Exist or Token Expired!' });
      }
    })
  }

  request (...args) {
    const { accessToken, refreshToken, accessTokenExpireDate, refreshTokenExpireDate } = this.user;
   
    if (accessToken && refreshToken && !this._isDateValid(accessTokenExpireDate) && this._isDateValid(refreshTokenExpireDate)) {
      
      return this._authenticate()
      .then(() => this.request(...args))
      .catch(error => Promise.reject({ status: 403, message: error.message}));

    } else {
  
      if (accessToken && accessTokenExpireDate && this._isDateValid(accessTokenExpireDate)) {
        console.log(`Current Date: `, `${new Date()}`.cyan);
        console.log(`Access token `, `${accessToken}`.cyan, ` will expire at `, `${milisecondsToDate(accessTokenExpireDate)}`.cyan);
        console.log(`Refresh token `,`${refreshToken}`.cyan, ` will expire at `, `${milisecondsToDate(refreshTokenExpireDate)}`.cyan);
        console.log(`Fetching to `, `${args[0]}`.cyan, ` with these arguments `, `${JSON.stringify(args[1]) || "' '"}`.cyan);

        const customHeaders =  {headers: { "X-Auth-Token": accessToken }};

        args[1] = args[1] === undefined ? customHeaders : fromJS(args[1]).mergeDeep(fromJS(customHeaders)).toJS();
  
        return fetch.apply(fetch, args);
        
      } else {

        return this._authenticate()
          .then(() => this.request(...args))
          .catch(error => Promise.reject({ status: 403, message: error.message}));
      }
    }
  }

  _isDateValid (dateString) {
    const bufferTime = 10000; //ms
    const comparaDate = parseInt(dateString) - bufferTime;
    const newDate = new Date();
    const currentDate = newDate.getTime();
    return (comparaDate > currentDate) ? true : false;
  }
}

export default authController;