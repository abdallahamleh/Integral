app.controller('serviceController', function ($scope, $http,$state) {
    $http.get("http://localhost:3001/servicetypes")
        .then(function (response) {
            $scope.services = response.data;
        }
        );
    $scope.removeService = function (id) {
        $http.delete('http://localhost:3001/removeservicetype?id=' + id).then(
            function () {
                $state.reload();
            },
            function () {
                console.log("error");
            });
    }

});
app.controller('serviceEditController', function ($scope, $http, $stateParams, $window) {
    $http.get("http://localhost:3001/servicetypes?id=" + $stateParams.id)
        .then(function (response) {
            $scope.name = response.data[0].SERVICETYPENAME;
            $scope.description = response.data[0].SERVICETYPEDESCRIPTION;
            $scope.price = response.data[0].SERVICETYPEPRICE;
        }
        );

    $scope.editServicePost = function () {
        $http({
            url: 'http://localhost:3001/editservicetype',
            method: "POST",
            data: { "id": $stateParams.id, "serviceTypeName": $scope.name, "serviceTypeDescription": $scope.description, "serviceTypePrice": $scope.price }
        })
            .then(function (response) {
                $window.location.href = '#!/home/services';
            },
                function (response) {
                    console.log("fail");
                });
    }
});
app.controller('serviceAddController', function ($scope, $http, $window) {

    $scope.name;
    $scope.description;
    $scope.price;
    $scope.addService = function () {
        $http({
            url: 'http://localhost:3001/addservicetype',
            method: "POST",
            data: { "serviceTypeName": $scope.name, "serviceTypeDescription": $scope.description, "serviceTypePrice": $scope.price }
        })
            .then(function (response) {
                $window.location.href = '#!/home/services';
            },
                function (response) {
                    console.log("fail");
                });
    }
});