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

  // find out of there are any items left to buy
  list1.isAvailableEmpty = ShoppingListCheckOffService.isAvailableEmpty;

  // buy an item, specifying the index number
  list1.buyItem = function (idx) {
    ShoppingListCheckOffService.buyItem(idx);
  };
}


//  Controller for items already bought
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var list2 = this;

  // get the list of items bought
  list2.shoppingList = ShoppingListCheckOffService.getBoughtItems();
  list2.isBoughtEmpty = ShoppingListCheckOffService.isBoughtEmpty;
}


// create the ShoppingListCheckOffService service
function ShoppingListCheckOffService() {
  var service = this;

  // initialize the lists
  service.boughtItems = [];
  service.availableItems = [
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
    var item = service.getAvailableItem(idx);
    service.boughtItems.push(item);
    service.removeItem(idx);
  };

  // pull the bought item off the available list
  service.removeItem = function (itemIndex) {
    service.availableItems.splice(itemIndex, 1);
  };

  // expose/return the available items array
  service.getAvailableItems = function () {
    return service.availableItems;
  };

  // expose/return the bought items array
  service.getBoughtItems = function () {
    return service.boughtItems;
  };

  // get one specific item, based on the index
  service.getAvailableItem = function (idx) {
    var item = service.availableItems[idx];
    return item;
  };

  service.isAvailableEmpty = function () {
    return service.availableItems.length === 0;
  };

  service.isBoughtEmpty = function () {
      return service.boughtItems.length === 0;
  };
}

})();
