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

  list1.buyItem = function (itemName, itemQuantity) {
    console.log('Buying item name ' + itemName + ' and quantity ' + itemQuantity);
    ShoppingListCheckOffService.buyItem(itemName, itemQuantity);
  };
}


// LIST #2 - controller
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var list2 = this;

  // initialize the shopping list
  list2.shoppingList = ShoppingListCheckOffService.getBoughtItems();
  console.log(list2.shoppingList);
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

  service.buyItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    boughtItems.push(item);
    console.log(boughtItems);

    // TODO remove the bought item from the availableItems list

  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.stillSomeLeft = function() {
    if (availableItems.length != 0){
      return true;
    } else {
      return false;
    }
  };

  service.getAvailableItems = function () {
    return availableItems;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}

})();
