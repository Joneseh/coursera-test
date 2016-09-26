(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
		var showToBuyList = this;
		showToBuyList.items = ShoppingListCheckOffService.getToBuyItems();
		showToBuyList.moveItem = function (itemIndex) {
				ShoppingListCheckOffService.moveItem(itemIndex);
  }
}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
		var showBoughtList = this;
		showBoughtList.items = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var tobuyitems = [];
  var boughtitems = [];
	
	service.addToBuyItem = function (itemName, quantity) {
    var item = {		
      name: itemName,
      quantity: quantity
    };
		tobuyitems.push(item);
	};
	service.addToBoughtItem = function (itemName, quantity) {
    var item = {		
      name: itemName,
      quantity: quantity
    };
		boughtitems.push(item);
	};	
	// initialize tobuyitems
	service.addToBuyItem("milk",1);
	service.addToBuyItem("bread",3);
	service.addToBuyItem("eggs",1);
	service.addToBuyItem("cookies",10);
	service.addToBuyItem("butter",4);
  
	service.moveItem = function (itemIndex) {
		var moveitem = tobuyitems[itemIndex];
		service.addToBoughtItem(moveitem.name, moveitem.quantity);
    tobuyitems.splice(itemIndex, 1);
  };

  service.getToBuyItems = function () {
    return tobuyitems;
  };
	
	service.getBoughtItems = function () {
    return boughtitems;
  };
}

})();
