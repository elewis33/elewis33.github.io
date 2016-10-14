// use the IIFE pattern "immediately invoked function expression"
(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.message = 'You must be hungry. Add something to your menu!'

  $scope.checkItems = function() {
    if ($scope.lunch_items === undefined) {
      $scope.message = 'Please enter data first!';
      $scope.message_style = 'red'
      $scope.input_style = 'border-color:red;'
    } else {
      var splits = $scope.lunch_items.split(',');
      if (splits.length <= 3) {
        $scope.message = 'Enjoy!'
      } else if (splits.length > 3) {
        $scope.message = 'Too much!'
      }
      $scope.message_style = 'green';
      $scope.input_style = 'border-color:green';
    }
  };
}

})();
