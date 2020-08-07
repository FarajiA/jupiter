exports.config = {
  tests: './tests/**/*/test_testCodeceptInCircleCI.js',
  output: './output',
  helpers: {
    WebDriver: {
      url: 'https://localhost:3000',
      host: 'hub',
      browser: 'chrome',
      waitForTimeout: 20000,
      smartWait: 8000,
      timeouts: {
        'page Load': 30000
      },
      desiredCapabilities: {
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
          args: [
            '--disable-gpu',
            '--no-sandbox',
            '--start-maximized',
            '--window-size=1341,810'
          ]
        }
      }
    },
    ChaiWrapper: {
      require: './node_modules/codeceptjs-chai'
    }
  },
  include: {
    I: './steps_file.js',
    customerInfo: './fragments/customerInfo.js',
    billing: './fragments/billing.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'acceptance',
  plugins: {
    retryFailedStep: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    }
  }
};
