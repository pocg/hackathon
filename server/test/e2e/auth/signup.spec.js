'use strict';

var Chance = require('chance');
var SignupPage = require('../pages/signup.page.js');

describe('Signup e2e tests', function() {
  var signup = new SignupPage();
  var chance = new Chance();
    
  var fields = {
    first: chance.first(),
    last: chance.last(),
    email: chance.email(),
    user: chance.hash(),
    pass: chance.string({pool: 'abcdefghijklmnopqrstuvwxyz0123456789', length: 8}) 
  };

  beforeEach(function() {
    signup.visit();
  });

  describe('As a user, I should be able to sign up', function() {

    it('should sign me up and redirect to home route', function() {
      browser.driver.manage().deleteAllCookies();
      signup.fillFields(fields);
      signup.clickSubmit();
      expect(browser.getCurrentUrl()).toMatch('http://localhost:3000/#!/');
    });

  });

});