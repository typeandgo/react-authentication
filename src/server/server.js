import express from 'express';
import session from 'express-session';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';
import colors from 'colors';
import config from '../config';
import authorizationKey from './utils/authorizationKey';
import serializeJson from './utils/serializeJson';
import auth from './middlewares/auth';
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: config.expressSessionSecretKey, resave: false, saveUninitialized: false}));
app.use(auth);

app.post(config.bffLoginUrl, (req, res) => {
  
  const formData = Object.assign({}, 
    req.body, 
    { clientId: config.oAuthClient.clientId },
    { clientSecret: config.oAuthClient.clientSecret }
  );

  const options = {
    method: 'post',
    body: serializeJson(formData),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': authorizationKey
    }
  };
  
  fetch(config.apiLoginUrl, options)
    .then(resp => resp.json())
    .then(body => {
      
      if (body.userId) {
        req.session.user = body;
      }

      res.json(body);   
    })
    .catch(error => console.log("FETCH ERROR: ", `${JSON.stringify(error)}`.red));
});

app.get(config.bffLogoutUrl, (req, res) => {
  const formData = {
    token: req.session.user ? req.session.user.accessToken : ''
  };

  const options =  {
    method: 'post',
    body: serializeJson(formData),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Authorization': authorizationKey,
      'Accept': 'application/json;charset=UTF-8'
    }
  };

  fetch(config.apiLogoutUrl, options)
    .then(resp => new Promise((resolve, reject) => resp.status === 204 ? resolve({}) : resolve(resp.json())))
    .then(body => {
      req.session.user = {}
      res.json(body);
    })
    .catch(error => console.log("FETCH ERROR: ", `${JSON.stringify(error)}`.red));
});

app.get(config.bffGetUserUrl, (req, res) => {
  res.json(req.session.user || {})
});

app.get('/bff/forbiddenUrl', (req, res) => {
  req.authController.request('http://internal-api-gateway-bilyoner-dev.openshift-test.bilyoner.com/web/users/authentication/details')
    .then(resp => resp.json())
    .then(body => res.json(body))
    .catch(error => {
      console.log("FETCH ERROR: ", `${JSON.stringify(error)}`.red)
      if (error.status === 403) {
        return res.status(403).send(error.message);
      }
    });
});

app.post('/bff/fakeLogin', (req, res) => {
  res.status(503).json({
    status: 503,
    message: "Api is not responding",
    errors:[{
      domain: "user-authentication-manager",
      code: 503,
      message: "Api is not responding",
      location: null,
      locationType: null
    }]
  })
});

const port = 3001;

app.listen(port, () => {  console.log(`Server started on port ${port}`) });
