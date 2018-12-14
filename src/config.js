const config = {
  tokenValidAccessToken: {
    accessToken: "enginA-valid",
    refreshToken: "enginR-valid",
    accessTokenExpireDate: "1574955930000",
    refreshTokenExpireDate: "1577547930000"
  },  
  tokenExpiredAccessToken: {
    accessToken: "gokhanA-expired",
    refreshToken: "gokhanR-valid",
    accessTokenExpireDate: "1544500620000",
    refreshTokenExpireDate: "1577547930000"
  },
  tokenInvalidAccessToken: {
    accessToken: "aykutA-expired",
    refreshToken: "aykutB-expired",
    accessTokenExpireDate: "1541951130000",
    refreshTokenExpireDate: "1541951130000"
  },
  
  bffRootPath: 'http://localhost:3000',
  bffLogin: '/bff/auth/login',
  bffLogout: '/bff/auth/logout',
  bffGetToken: '/bff/auth',
  bffRefreshToken: '/bff/auth/refresh',
  bffUser: '/bff/user',
  bffDashboardData: '/bff/dashboard',
  
  apiRootPath: 'http://localhost:3001',
  apiUser: '/api/auth/users',
  apiLogin: '/api/auth/login',
  apiLogout: '/api/auth/logout',
  apiRefreshToken: '/api/auth/refresh',
  apiDashboardData: '/api/dashboard'
}

module.exports = config;