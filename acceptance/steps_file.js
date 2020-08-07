// in this file you can append custom step methods to 'I' object
const loginPage = require('./pages/loginPage');

module.exports = function () {
  return actor({
    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.

    goToRoot(url = loginPage.urls.localhost) {
      this.amOnPage(url);
      this.waitInUrl('https://localhost:3000');
      this.waitForElement('.SignUp-header');
    },
    async login(endpoint = '/') {
      this.goToRoot(endpoint);
    }
  });
};
