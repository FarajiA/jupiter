const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const readlineSync = require('readline-sync');
const fs = require('fs');

const PORTAL_URL = process.argv.includes('--staging')
  ? 'https://staging.portal.rackspace.com/'
  : 'https://portal.rackspace.com/';

// Ask dev for portal session id
console.log(`for /api/ access you need a portal session.
to get sessions ID: ${PORTAL_URL}racker Copy cookie value for "__Secure-portal_sessionid"`);

let portalSessionId = readlineSync.question('Enter Portal Session ID [DEFAULTS to last saved session]:');
if (!portalSessionId) {
  portalSessionId = fs.readFileSync('.portal-session').toString();
} else {
  fs.writeFileSync('.portal-session', portalSessionId);
}
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: !process.argv.includes('--staging')
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, './build/'),
    port: 3000,
    historyApiFallback: true,
    https: true,
    /** @docs https://github.com/chimurai/http-proxy-middleware */
    proxy: {
      '/api/**': {
        target: PORTAL_URL,
        changeOrigin: true,
        cookieDomainRewrite: '',
        onProxyReq: (proxyReq) => {
          proxyReq.setHeader('Cookie', `__Secure-portal_sessionid=${portalSessionId}`);
        },
        bypass: (req, res) => {
          if (req.headers) {
            req.headers.referer = `${PORTAL_URL}racker/jupiter/`;
          }
        },
        secure: true
      }
    }
  }
});
