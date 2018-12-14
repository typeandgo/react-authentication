const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

require('./expressStore').init(app);

require('./authentication').init(app);

require('./backend').init(app);

app.get(config.bffUser, (req, res) => {
  req.oAuthClient.request(config.apiRootPath + config.apiUser, {}, req.session.token)
    .then(result => result.json())
    .then(json => res.json(json))
    .catch(error => {
      console.log("Fetch Error: ", error);
      if (error.status === 403) {
        return res.status(403).send('Forbidden');
      }
      return res.status(500).send(error.message);
    });  
});

app.get(config.bffDashboardData, (req, res) => {
  req.oAuthClient.request(config.apiRootPath + config.apiDashboardData, {}, req.session.token)
    .then(result => result.json())
    .then(json => res.json(json))
    .catch(error => {
      console.log("Fetch Error: ", error);
      if (error.status === 403) {
        return res.status(403).send('Forbidden');
      }
      return res.status(500).send(error);
    });
});

const port = 3001;

app.listen(port, () => {  console.log(`Server started on port ${port}`) });
