(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.lunchlist = "";
	$scope.lunchmsg = "";
	
	$scope.check_if_too_much = function () {
		var msg="";
		if ($scope.lunchlist.length == 0) {
			msg= "Please enter data first";
		}
		else {
			var cnt_array = $scope.lunchlist.split(",").length;
			if (cnt_array < 4 ) {
				msg = "Enjoy!";
			}
			else {
				msg= "Too much!";
			}	
		}
		$scope.lunchmsg = msg;
  };
}

})();
