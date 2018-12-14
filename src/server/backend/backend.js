// --------------------- //
// SIMULATED BE SERVICES //
// --------------------- //

const config = require('../../config');

function backend (app) {
  // User Info
  app.get(config.apiUser, (req, res) => {
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

  // Login
  app.post(config.apiLogin, (req, res) => {
    res.json(config.tokenValidAccessToken);
  });

  // Logout
  app.post(config.apiLogout, (req, res) => {
    res.json({});
  });

  // Token Refresh
  app.put(config.apiRefreshToken, (req, res) => {
    res.json(config.tokenValidAccessToken);
  });

  // Dashboard
  app.post(config.apiDashboardData, (req, res) => {
    res.json({
      data: 'HELLO WORLD!'
    });
  });
}

module.exports = backend;