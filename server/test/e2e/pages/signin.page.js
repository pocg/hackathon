'use strict';

var SigninPage = (function() {

  function SigninPage() {
    this.user = element(by.id('username'));
    this.pass = element(by.id('password'));
    this.submit = element(by.css('button[type=submit]'))
  }

  SigninPage.prototype.visit = function() {
    browser.get('/#!/signin')
  };

  SigninPage.prototype.signin = function(user, pass, cb) {
    this.user.sendKeys(user);
    this.pass.sendKeys(pass);
    this.submit.click(function() {
      return cb();
    });
  };

  return SigninPage;

})();

module.exports = SigninPage;

