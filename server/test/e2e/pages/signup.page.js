'use strict';

var SignupPage = (function() {

  function SignupPage() {
    this.first = element(by.id('firstName'));
    this.last = element(by.id('lastName'));
    this.email = element(by.id('email'));
    this.user = element(by.id('username'));
    this.pass = element(by.id('password'));
    this.submit = element(by.css('.btn-primary'));
  }

  SignupPage.prototype.visit = function() {
    browser.get('/#!/signup');
  };

  SignupPage.prototype.fillFields = function(fields) {
    this.first.sendKeys(fields.first);
    this.last.sendKeys(fields.last);
    this.email.sendKeys(fields.email);
    this.user.sendKeys(fields.user);
    this.pass.sendKeys(fields.pass);
  };

  SignupPage.prototype.clickSubmit = function() {
    this.submit.click();
  }

  return SignupPage;

})();

module.exports = SignupPage;

