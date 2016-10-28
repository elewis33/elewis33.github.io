(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiPath', "https://davids-restaurant.herokuapp.com/menu_items.json");

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      myTitle: '@title',
      badRemove: '=',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;

  list.itemsInList = function () {
    for (var i = 0; i < list.items.length; i++) {
      var name = list.items[i].name;
      if (name.toLowerCase().indexOf("cookie") !== -1) {
        return true;
      }
    }

    return false;
  };
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.searchTerm = '';

  var promise = MenuSearchService.getMenuItems();

  promise.then(function (response) {
    menu.items = response.data.menu_items;
    console.log(menu.items);
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });

  // menu.logMenuItems = function () {
  //   var promise = MenuSearchService.getMenuItems();
  //
  //   promise.then(function (response) {
  //     console.log(response.data);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   })
  // };

}


MenuSearchService.$inject = ['$http', 'ApiPath']
function MenuSearchService($http, ApiPath) {
  var service = this;
  service.found = [];

  service.getMenuItems = function () {
    console.log('running getMenuItems');
    var response = $http({
      method: "GET",
      url: (ApiPath)
    });

    return response;
  };

}

})();
