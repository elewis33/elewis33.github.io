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
        menu.pendingTimeout = 100;
        menu.isPending = false;
        menu.showMessage = false;
        menu.found = [];

        menu.searchItems = function () {
            menu.showMessage = false;
            menu.isPending = true;
            menu.found = [];

            MenuSearchService.getMatchedMenuItems(menu.searchTerm, menu.pendingTimeout)
                .then(function (response) {
                    menu.found = response;
                    console.info('found:', menu.found);
                })
                .catch(function (response) {
                    menu.found = response;
                    console.info('catch:', menu.found);
                })
                .finally(function () {
                    menu.isPending = false;
                    menu.showMessage = menu.isEmpty();
                });
        }

        menu.isEmpty = function () {
            return menu.found.length == 0;
        }

        menu.removeItem = function (itemIndex) {
            var removedItem = menu.found.splice(itemIndex, 1);
            console.log('removed:', removedItem);

            return removedItem;
        };

        menu.setPendingTimeout = function (timeout) {
            menu.pendingTimeout = timeout;
        }
    }

MenuSearchService.$inject = ['$q', '$http', 'ApiPath', '$timeout'];
function MenuSearchService($q, $http, apiPath, $timeout) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm, pendingTimeoutForEmptySearchTerm) {
        var deferred = $q.defer();
        var result = [];

        searchTerm = (searchTerm || '').trim().toLowerCase();

        if (searchTerm === '') {
            $timeout(function () {
                deferred.reject(result);
            }, pendingTimeoutForEmptySearchTerm || 100);

            return deferred.promise;
        }

        $http({
            method: 'GET',
            url: apiPath

        }).then(function (response) {
            var menu = response.data.menu_items;

            menu.forEach(function (item) {
                var description = item.description.toLowerCase();

                if (description.indexOf(searchTerm) >= 0) {
                    result.push(item);
                    console.log('description:', '"' + item.description + '"');
                }
            });

            deferred.resolve(result);

        }).catch(function (response) {
            result.push({
                "name": "error",
                "short_name": response.status,
                "description": response.statusText || response
            });

            deferred.reject(result);
        });

        return deferred.promise;
    };
}

})();
