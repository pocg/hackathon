'use strict';

var GroceriesPage = (function() {

  function GroceriesPage() {
    this.h1 = element(by.tagName('h1'));
    this.item = element(by.id('item'));
    this.quantity = element(by.id('quantity'));
    this.groceryList = element.all(by.repeater('grocery in groceries'));
    this.addButton = element(by.id('add'));
    this.error = element(by.id('error'));
  }

  GroceriesPage.prototype.visit = function() {
    browser.get('/#!/groceries');
  };

  GroceriesPage.prototype.itemAt = function(index) {
    return this.groceryList.get(index).element(by.css('.item'));
  };

  GroceriesPage.prototype.quantityAt = function(index) {
    return this.groceryList.get(index).element(by.css('.quantity'));
  };

  GroceriesPage.prototype.addItem = function(item, quantity) {
    this.item.sendKeys(item);
    this.quantity.sendKeys(quantity);
    this.addButton.click();
  };

  GroceriesPage.prototype.setEdit = function(index) {
    var listItem = this.groceryList.get(index);
    var editButton = listItem.element(by.css('.edit-btn'));
    editButton.click();
  };

  GroceriesPage.prototype.editItem = function(index, item, quantity) {
    this.setEdit(index);
    var listItem = this.groceryList.get(index);
    var itemText = listItem.element(by.css('.editItem'));
    var itemQuantity = listItem.element(by.css('.editQuantity'));
    var saveButton = listItem.element(by.css('.save'));
    itemText.clear().sendKeys(item);
    itemQuantity.clear().sendKeys(quantity);
    saveButton.click();
  };

  GroceriesPage.prototype.saveItem = function(index) {
    var saveButton = this.groceryList.get(index).element(by.css('.save'));
    saveButton.click();
  };

  GroceriesPage.prototype.cancelItem = function(index) {
    var cancelButton = this.groceryList.get(index).element(by.css('.cancel'));
    cancelButton.click();
  };

  GroceriesPage.prototype.deleteItem = function(index) {
    var deleteButton = this.groceryList.get(index).element(by.css('.delete'));
    deleteButton.click();
  };

  return GroceriesPage;

})();

module.exports = GroceriesPage;

