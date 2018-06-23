app.controller('clientController', function ($scope, $http, $state) {
    $http.get("http://localhost:3001/client")
        .then(function (response) {
            $scope.clients = response.data;
        }
        );
    $scope.removeClient = function (id) {
        $http.delete('http://localhost:3001/removeclient?id=' + id).then(
            function () {
                $state.reload();
            },
            function () {
                console.log("error");
            });
    }
    $scope.searchValue = "";
    $scope.search = function () {
        $http.get("http://localhost:3001/client?clientLastName=" + $scope.searchValue)
            .then(function (response) {
                $scope.clients = response.data;
            }
            );
    }
});
app.controller('clientEditController', function ($scope, $http, $stateParams, $window) {
    $http.get("http://localhost:3001/client?id=" + $stateParams.id)
        .then(function (response) {
            $scope.firstName = response.data[0].CLIENTFIRSTNAME;
            $scope.lastName = response.data[0].CLIENTLASTNAME;
            $scope.email = response.data[0].CLIENTEMAIL;
            $scope.phonenum = response.data[0].CLIENTPHONENUM;
            $scope.address = response.data[0].CLIENTADDRESS;
            $scope.city = response.data[0].CLIENTCITY;
            $scope.country = response.data[0].CLIENTCOUNTRY;
        }
        );

    $scope.editClientPost = function () {
        $http({
            url: 'http://localhost:3001/editclient',
            method: "POST",
            data: { "id": $stateParams.id, "clientFirstName": $scope.firstName, "clientLastName": $scope.lastName, "clientEmail": $scope.email, "clientPhoneNum": $scope.phonenum, "clientAddress": $scope.address, "clientCity": $scope.city, "clientCountry": $scope.country }
        })
            .then(function (response) {
                $window.location.href = '#!/home/client';
            },
                function (response) {
                    console.log("fail");
                });
    }
});
app.controller('clientViewController', function ($scope, $http, $stateParams) {
    $http.get("http://localhost:3001/client?id=" + $stateParams.id)
        .then(function (response) {
            $scope.viewClient = response.data[0];
        }
        );
});
app.controller('clientAddController', function ($scope, $http, $window) {

    $scope.addClient = function () {
        $http({
            url: 'http://localhost:3001/addclient',
            method: "POST",
            data: { "clientFirstName": $scope.firstName, "clientLastName": $scope.lastName, "clientEmail": $scope.email, "clientPhoneNum": $scope.phonenum, "clientAddress": $scope.address, "clientCity": $scope.city, "clientCountry": $scope.country }
        })
            .then(function (response) {
                $window.location.href = '#!/home/client';
            },
                function (response) {
                    console.log("fail");
                });
    }
});