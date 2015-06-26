'use strict';

var GroceriesPage = require('../pages/groceries.page.js');

describe('Groceries -', function() {
  var page = new GroceriesPage();

  beforeEach(function() {
    page.visit();
  });

  describe('As a user, I should see the following page elements when visiting the groceries page', function() {

    it('I should see an h1 tag = Grocery list', function() {
      expect(page.h1.getText()).toEqual('Grocery list');
    });

    it('I should see an item input text field defaulted to empty', function() {
      expect(page.item.getText()).toEqual('')
    });

    it('I should see a quantity text field defaulted to empty', function() {
      expect(page.quantity.getText()).toEqual('')
    });

    it('The page should have an error div that is hidden', function() {
      expect(page.error.isDisplayed()).toBeFalsy();
    });

  });

  describe('As a user, I should be able to add grocery items', function() {

    it('should add grocery items at the top of the list', function() { 
      page.addItem('Sushi', 1337);
      page.addItem('Pizza', 2);
      page.addItem('Beer', 12);
      expect(page.itemAt(0).getText()).toEqual('Beer');
      expect(page.itemAt(1).getText()).toEqual('Pizza');
    });

    it('should throw an error message if the item text field is not populated', function() { 
      page.addItem('', 2);
      expect(page.error.isDisplayed()).toBeTruthy();
      expect(page.error.getText()).toEqual('Please enter a grocery item');
    });

  });

  describe('As a user, I should be able to edit grocery items', function() {

    it('should allow me to edit a grocery item', function() {
      page.addItem('Jalapenos', 5);
      page.editItem(0, 'Scotch Bonnet Peppers', 10);
      expect(page.itemAt(0).getText()).toEqual('Scotch Bonnet Peppers');
      expect(page.quantityAt(0).getText()).toEqual('10');
    });

  });

  describe('As a user, I should be able to delete a grocery item', function() {

    it('should allow me to delete an item', function() {
      page.addItem('delete me', 1);
      expect(page.itemAt(0).getText()).toEqual('delete me');
      page.deleteItem(0);
      expect(page.itemAt(0).getText()).toNotEqual('delete me');
    });

  });

});