//
(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', function ($scope) {
  $scope.checkItems = function(lunch_items) {
    var count = lunch_items.split();
    return lunch_items.split().count();
  }

});

})();
