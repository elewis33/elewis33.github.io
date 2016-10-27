(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiPath', "https://davids-restaurant.herokuapp.com/menu_items.json");


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  var menu.searchTerm = '';

  var promise = MenuSearchService.getMatchedMenuItems();

  promise.then(function (response) {
    menu.data = response.data;
    console.log(menu.data);
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });

  menu.logMenuItems = function (searchTerm) {
    var promise = MenuSearchService.getMatchedMenuItems();

    promise.then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  };

}


MenuSearchService.$inject = ['$http', 'ApiPath']
function MenuSearchService($http, ApiPath) {
  var service = this;
  service.found = [];

  service.getMatchedMenuItems = function (menu.searchTerm) {
    console.log('running getMatchedMenuItems');
    var response = $http({
      method: "GET",
      url: (ApiPath)
    });

    return response;
  };

}

})();
