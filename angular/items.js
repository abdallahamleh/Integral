
app.controller('itemController', function ($scope, $http, $window, $cookieStore, $state) {
	$http.get("http://localhost:3001/item")
		.then(function (response) {
			$scope.items = response.data;
		}
		);
	$scope.searchValue = "";
	$scope.search = function () {
		$http.get("http://localhost:3001/item?itemname=" + $scope.searchValue)
			.then(function (response) {
				$scope.items = response.data;
			}
			);
	}
	$scope.request = function (id) {
		$http.get("http://localhost:3001/itemsuppliers?id=" + id)
			.then(function (response) {
				for (var i = 0; i < $scope.items.length; i++) {
					if ($scope.items[i].INVITEMID === id) {
						$scope.items[i].suppliers = response.data;
					}
				}
			}
			);
	}
	$scope.deleteItem = function (id) {
		$http.delete('http://localhost:3001/removeitem?id=' + id).then(
			function () {
				$state.reload();
			},
			function () {
				console.log("error");
			});
	}
	$scope.consume = function (id, amount) {
		$http({
			url: 'http://localhost:3001/edititemamount',
			method: "POST",
			data: {
				"itemid": id, "itemAmount": amount
			}
		})
			.then(
				function (response) {
					$state.reload();
				},
				function (response) {
					console.log("fail");
				});
	}
	$scope.sendRequest = function (itemId, price, quantity, notes, sup) {
		$http({
			url: 'http://localhost:3001/addrequest',
			method: "POST",
			data: { "invItemId": itemId, "supplierID": sup.SUPPLIERID, "empID": $cookieStore.get('loggedemp'), "requestQuantity": quantity, "requestNotes": notes, "requestTotalPrice": price * quantity }
		})
			.then(function (response) {
				$window.location.href = '#!/home/pendingRequests';
			},
				function (response) {
					console.log("fail");
				});
	}
});
app.controller('itemAddController', function ($scope, $http, $window) {
	$http.get("http://localhost:3001/itemtype")
		.then(function (response) {
			$scope.types = response.data;
		}
		);
	$scope.unitList = ['g', 'kg', 'ton', 'liter', 'pieces', 'carton (24pieces)', 'dozen'];
	$scope.addItem = function () {

		$http({
			url: 'http://localhost:3001/additem',
			method: "POST",
			data: {
				"itemtypeid": $scope.itemTypeName.INVITEMTYPEID, "itemName": $scope.itemName, "itemAmount": $scope.itemQuantity, "itemUnit": $scope.itemUnit, "lastPurchasePrice": $scope.itemPP, "minAllowedAmount": $scope.itemMinAmount
			}
		})
			.then(
				function (response) {
					$window.location.href = '#!/home/item';
				},
				function (response) {
					console.log("fail");
				});
	}
});
app.controller('itemTypeManageController', function ($scope, $http) {
	$http.get("http://localhost:3001/itemtype")
		.then(function (response) {
			$scope.types = response.data;
		}
		);
	$scope.deleteType = function (id) {
		$http.delete('http://localhost:3001/removeitemtype?id=' + id).then(
			function () {
			},
			function () {
				console.log("error");
			});
	}
});
app.controller('itemTypeAddController', function ($scope, $http, $window) {
	$scope.itemTypeName;
	$scope.addItemType = function () {
		$http({
			url: 'http://localhost:3001/additemtype',
			method: "POST",
			data: { "itemTypeName": $scope.itemTypeName }
		})
			.then(function (response) {
				$window.location.href = '#!/home/manageItemType';
			},
				function (response) {
					console.log("fail");
				});
	}
});

app.controller('itemEditController', function ($scope, $http, $stateParams, $window) {
	$http.get("http://localhost:3001/item?id=" + $stateParams.id)
		.then(function (response) {
			$scope.itemName = response.data[0].INVITEMNAME;
			$scope.itemType = response.data[0].INVITEMTYPENAME;
			$scope.itemUnit = response.data[0].INITEMMEASUREMENTUNIT;
			$scope.itemPP = response.data[0].LASTPURCHASEPRICE;
			$scope.itemMinAmount = response.data[0].MINALLOWEDAMOUNT;
		}
		);
	$http.get("http://localhost:3001/itemtype")
		.then(function (response) {
			$scope.types = response.data;
			for (var i = 0; i < $scope.types.length; i++) {
				if ($scope.types[i].INVITEMTYPENAME == $scope.itemType) {
					$scope.itemTypeName = $scope.types[i];
				}
			}
		}
		);
	$scope.unitList = ['g', 'kg', 'ton', 'liter', 'pieces', 'carton (24pieces)', 'dozen'];
	$scope.editItemPost = function () {
		$http({
			url: 'http://localhost:3001/edititem',
			method: "POST",
			data: { "itemid": $stateParams.id, "itemTypeid": $scope.itemTypeName.INVITEMTYPEID, "itemName": $scope.itemName, "itemUnit": $scope.itemUnit, "lastPurchasePrice": $scope.itemPP, "minAllowedAmount": $scope.itemMinAmount }
		})
			.then(function (response) {
				$window.location.href = '#!/home/item';
			},
				function (response) {
					console.log("fail");
				});
	}
});