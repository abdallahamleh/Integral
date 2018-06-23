app.controller('loginController', function ($scope, $http, $window, $cookieStore) {
    $scope.wrong = false;
    $scope.login = function () {
        $http({
            url: 'http://localhost:3001/login',
            method: "POST",
            data: { "username": $scope.username, "password": $scope.password }
        })
            .then(function (response) {
                if (response.data[0] !== undefined) {
                    $cookieStore.put('loggedemp', response.data[0].EMPID);
                    $window.location.href = '#!/home/main';

                }
                else {
                    $scope.wrong = true;
                }
            },
                function (response) {
                    console.log("fail");
                });
    }

});