const fetch = require('node-fetch');
const authCheck = require('../middlewares/AuthCheck');
const config = require('../../config');

function authentication (app) {
  
  app.use(authCheck);

  // Current Token & Login Status
  app.get(config.bffGetToken, (req, res) => {

    const token = req.session.token || {};
    const isAuth = req.session.isAuth || 'UNKNOWN';

    res.json({
      isAuth,
      token
    });
  });
  
  // Login
  app.post(config.bffLogin, (req, res) => {
    fetch(config.apiRootPath + config.apiLogin, {
      method: 'post',
      body: JSON.stringify(req.body),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(result => result.json())
    .then(json => {      
        req.session.isAuth = 'AUTHENTICATED';
        req.session.token = json;
        console.log('Fetch Response: ', JSON.stringify(json));
        res.json({
          isAuth: 'AUTHENTICATED',
          token: json
        });
      }
    ).catch(error => {
      console.log("Fetch Error: ", error);
      return res.status(500).send(error.message);
    });
  });
  
  // Logout
  app.get(config.bffLogout, (req, res) => {
    req.oAuthClient.request(config.apiRootPath + config.apiLogout, {
      method: 'post',
      body: JSON.stringify({ token: req.session.token.accessToken }),
      headers: { 'Content-Type': 'application/json' }
    }, req.session.token)
    .then( result => result.json())
    .then( json => {
      req.session.isAuth = 'UNAUTHENTICATED';
      req.session.token = json;
      console.log('Fetch Response: ', JSON.stringify(json));
      res.json({
        isAuth: 'UNAUTHENTICATED',
        token: json
      });
    }).catch(error => {
      console.log("Fetch Error: ", error);
      return res.status(500).send(error.message);
    });
  });

  // Token Refresh
  app.post(config.bffRefreshToken, (req, res) => {
    fetch(config.apiRootPath + config.apiRefreshToken, {
      method: 'put',
      body: JSON.stringify(req.body),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(result => result.json())
    .then(json => {      
        req.session.isAuth = 'AUTHENTICATED';
        req.session.token = json;
        console.log('Fetch Response: ', JSON.stringify(json));
        res.json({
          isAuth: 'AUTHENTICATED',
          token: json
        });
      }
    ).catch(error => {
      console.log("Fetch Error: ", error);
      return res.status(500).send(error.message);
    });
  });
}

module.exports = authentication;