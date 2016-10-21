(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// LIST #1 - controller
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var list1 = this;

  // get available items from the service
  list1.shoppingList = ShoppingListCheckOffService.getAvailableItems();
  list1.stillSomeLeft = ShoppingListCheckOffService.stillSomeLeft();
  list1.itemCount = ShoppingListCheckOffService.countAvailableItems();

  list1.buyItem = function (idx) {
    ShoppingListCheckOffService.buyItem(idx);
  };
}


// LIST #2 - controller
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var list2 = this;

  // initialize the shopping list
  list2.shoppingList = ShoppingListCheckOffService.getBoughtItems();
}


// create the ShoppingListCheckOffService service
function ShoppingListCheckOffService() {
  var service = this;

  // initialize the lists
  var boughtItems = [];
  var availableItems = [
    {
      name: "gallons of milk",
      quantity: "2"
    },
    {
      name: "loaves of bread",
      quantity: "2"
    },
    {
      name: "bell peppers",
      quantity: "4"
    },
    {
      name: "bunches of bananas",
      quantity: "2"
    },
    {
      name: "dozen eggs",
      quantity: "2"
    }
  ];

  service.buyItem = function (idx) {
    if (service.stillSomeLeft()) {
      var item = service.getAvailableItem(idx);
      boughtItems.push(item);
      service.removeItem(idx);
    }
  };

  service.removeItem = function (itemIndex) {
    availableItems.splice(itemIndex, 1);
  };

  service.stillSomeLeft = function() {
    if (availableItems.length >0) {
      console.log(availableItems.length);
      // console.log(true);
      return true;
    } else {
      // console.log(availableItems.length);
      // console.log(false);
      return false;
    }
  };

  // expose/return the available items array
  service.getAvailableItems = function () {
    return availableItems;
  };

  // expose/return the bought items array
  service.getBoughtItems = function () {
    return boughtItems;
  };

  // get one specific item, based on the index
  service.getAvailableItem = function (idx) {
    var item = availableItems[idx];
    return item;
  };

  service.countAvailableItems = function () {
    return availableItems.length;
  }
}

})();
