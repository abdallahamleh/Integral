app.controller('mainController', function ($scope, $http, $cookieStore) {
    $http.get("http://localhost:3001/empuser?id=" + $cookieStore.get('loggedemp'))
        .then(function (response) {
            $scope.toggle = false;
            $scope.empName = response.data[0].EMPFIRSTNAME + " " + response.data[0].EMPLASTNAME;
            $scope.empPos = response.data[0].EMPPOSITION;
            $scope.emps = response.data[0].HASACCESSEMPLOYEES;
            $scope.facilities = response.data[0].HASACCESSFACILITIES;
            $scope.inventory = response.data[0].HASACCESSINVENTORY;
            $scope.reserv = response.data[0].HASACCESSRESERV;
            $scope.room = response.data[0].HASACCESSROOM;
        }
        );
});