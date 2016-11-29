(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService( $http, ApiBasePath ) {
  var service = this;

	// That method will be responsible for reaching out to the server (using the $http service) to retrieve the list of all the menu items. 
	//Once it gets all the menu items, it should loop through them to pick out the ones whose description matches the searchTerm. 
	//Once a list of found items is compiled, it should return that list (wrapped in a promise).
	service.getMatchedMenuItems = function(searchTerm) {
		

		return $http( {
			method: 'GET',
			url: (ApiBasePath + "/menu_items.json")
		}).then(function (result) {
    // process result and only keep items that match
			 var foundItems = [];
			 var items = result['data']['menu_items'];
        for (var i = 0; i < items.length; ++i) {
          if (items[i]['description'].indexOf(searchTerm) !== -1) {
            foundItems.push(items[i]);
          }
        }
    // return processed items
			return foundItems;
		});
	}
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	 var nidctrl = this;
	 nidctrl.loadItems = function() {
		 if (this.searchTerm !== "") {
        MenuSearchService.getMatchedMenuItems(this.searchTerm).then(function(response) {
          nidctrl.items = response;
        });
      } else {
        nidctrl.items = [];
      }
    };
		
		 nidctrl.onRemove = function(index) {
      nidctrl.items.splice(index, 1);
    };
}




  function FoundItemsDirective() {
    return {
      restrict: 'E',
      scope: {
        'foundItems': '<',
        'onRemove': '&'
      },
      templateUrl: 'itemsList.html'
    };
  };




})();
