// use the IIFE pattern "immediately invoked function expression"
(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.message = 'You must be hungry. Add something to your menu!'
  $scope.count_items = 0;

  $scope.checkItems = function() {
    if ($scope.lunch_items === undefined) {
      return null;
    } else {
      var splits = $scope.lunch_items.split(',');
      if (splits.length <= 3) {
        $scope.message = 'Enjoy!'
      } else if (splits.length > 3) {
        $scope.message = 'Too much!'
      }
    }
  };
}

})();
