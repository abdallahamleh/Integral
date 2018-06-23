app.controller('requestPendingController', function ($scope, $http, $window) {
    $http.get("http://localhost:3001/listundonerequest")
        .then(function (response) {
            $scope.requests = response.data;
        }
        );
    $scope.confirm = function (id) {
        $http({
            url: 'http://localhost:3001/requestdone',
            method: "POST",
            data: {
                "id": id
            }
        })
            .then(
                function (response) {
                    $window.location.href = '#!/home/completedRequests';
                },
                function (response) {
                    console.log("fail");
                });
    }
});
app.controller('requestCompletedController', function ($scope, $http) {
    $http.get("http://localhost:3001/listdonerequest")
        .then(function (response) {
            $scope.requests = response.data;
        }
        );
});