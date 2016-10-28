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
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'found',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.searchTerm = '';

  var promise = MenuSearchService.getMenuItems();

  promise.then(function (response) {
    menu.found = response.data.menu_items;
    console.log(menu.menu_items);
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });
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
