app.controller('supplierController', function ($scope, $http, $state) {
    $http.get("http://localhost:3001/supplier")
        .then(function (response) {
            $scope.suppliers = response.data;
        }
        );
    $http.get("http://localhost:3001/reservationservices?id=1")
        .then(function (response) {
            console.log(response.data)
        }
        );
    $scope.removeSupplier = function (id) {
        $http.delete('http://localhost:3001/removesupplier?id=' + id).then(
            function () {
                $state.reload();
            },
            function () {
                console.log("error");
            });
    }
    $scope.searchValue = "";
    $scope.search = function () {
        $http.get("http://localhost:3001/supplier?compname=" + $scope.searchValue)
            .then(function (response) {
                $scope.suppliers = response.data;
            }
            );
    }
});
app.controller('supplierViewController', function ($scope, $http, $stateParams) {
    $http.get("http://localhost:3001/supplier?id=" + $stateParams.id)
        .then(function (response) {
            $scope.viewSupplier = response.data[0];
        }
        );
});
app.controller('supplierEditController', function ($scope, $http, $stateParams, $window) {
    $http.get("http://localhost:3001/supplier?id=" + $stateParams.id)
        .then(function (response) {
            $scope.compName = response.data[0].SUPPLIERCOMPANYNAME;
            $scope.compEmail = response.data[0].SUPPLIERCOMPANYEMAIL;
            $scope.compNum = response.data[0].SUPPLIERCOMPANYPHONENUM;
            $scope.compAdd = response.data[0].SUPPLIERCOMPANYADRESS;
            $scope.compCity = response.data[0].SUPPLIERCOMPANYCITY;
            $scope.compCountry = response.data[0].SUPPLIERCOMPANYCOUNTRY;
            $scope.contName = response.data[0].SUPPLIERCONTACTNAME;
            $scope.contNum = response.data[0].SUPPLIERCONTACTPHONENUM;
            $scope.notes = response.data[0].SUPPLIERNOTES;
        }
        );

    $scope.editSupplierPost = function () {
        $http({
            url: 'http://localhost:3001/editsupplier',
            method: "POST",
            data: { "id": $stateParams.id, "companyName": $scope.compName, "companyEmail": $scope.compEmail, "companyPhoneNum": $scope.compNum, "companyAddress": $scope.compAdd, "companyCity": $scope.compCity, "companyCountry": $scope.compCountry, "contactName": $scope.contName, "contactPhoneNum": $scope.contNum, "notes": $scope.notes }
        })
            .then(function (response) {
                $window.location.href = '#!/home/supplier';
            },
                function (response) {
                    console.log("fail");
                });
    }
});
app.controller('supplierAddController', function ($scope, $http, $window) {
    $scope.addSupplier = function () {
        $http({
            url: 'http://localhost:3001/addsupplier',
            method: "POST",
            data: { "companyName": $scope.compName, "companyEmail": $scope.compEmail, "companyPhoneNum": $scope.compNum, "companyAddress": $scope.compAdd, "companyCity": $scope.compCity, "companyCountry": $scope.compCountry, "contactName": $scope.contName, "contactPhoneNum": $scope.contNum, "notes": $scope.notes }
        })
            .then(function (response) {
                $window.location.href = '#!/home/supplier';
            },
                function (response) {
                    console.log("fail");
                });
    }
});
app.controller('supplierEditController', function ($scope, $http, $stateParams, $window) {
    $http.get("http://localhost:3001/supplier?id=" + $stateParams.id)
        .then(function (response) {
            $scope.compName = response.data[0].SUPPLIERCOMPANYNAME;
            $scope.compEmail = response.data[0].SUPPLIERCOMPANYEMAIL;
            $scope.compNum = response.data[0].SUPPLIERCOMPANYPHONENUM;
            $scope.compAdd = response.data[0].SUPPLIERCOMPANYADRESS;
            $scope.compCity = response.data[0].SUPPLIERCOMPANYCITY;
            $scope.compCountry = response.data[0].SUPPLIERCOMPANYCOUNTRY;
            $scope.contName = response.data[0].SUPPLIERCONTACTNAME;
            $scope.contNum = response.data[0].SUPPLIERCONTACTPHONENUM;
            $scope.notes = response.data[0].SUPPLIERNOTES;
        }
        );

    $scope.editSupplierPost = function () {
        $http({
            url: 'http://localhost:3001/editsupplier',
            method: "POST",
            data: { "id": $stateParams.id, "companyName": $scope.compName, "companyEmail": $scope.compEmail, "companyPhoneNum": $scope.compNum, "companyAddress": $scope.compAdd, "companyCity": $scope.compCity, "companyCountry": $scope.compCountry, "contactName": $scope.contName, "contactPhoneNum": $scope.contNum, "notes": $scope.notes }
        })
            .then(function (response) {
                $window.location.href = '#!/home/supplier';
            },
                function (response) {
                    console.log("fail");
                });
    }
});
app.controller('supplierViewItemsController', function ($scope, $http, $stateParams, $window, $cookieStore) {
    $http.get("http://localhost:3001/supplierItems?id=" + $stateParams.id)
        .then(function (response) {
            $scope.items = response.data;
            for (var i = 0; i < $scope.items.length; i++) {
                $scope.items[i].notes = "";
                $scope.items[i].quan = "";
            }
        }
        );
    $scope.postRequest = function (itemId, price, quantity, notes) {
        $http({
            url: 'http://localhost:3001/addrequest',
            method: "POST",
            data: { "invItemId": itemId, "supplierID": $stateParams.id, "empID": $cookieStore.get('loggedemp'), "requestQuantity": quantity, "requestNotes": notes, "requestTotalPrice": price * quantity }
        })
            .then(function (response) {
                $window.location.href = '#!/home/pendingRequests';
            },
                function (response) {
                    console.log("fail");
                });
    }

});