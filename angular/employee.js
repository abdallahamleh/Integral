app.controller('employeeController', function ($scope, $http, $window, $state) {
    $http.get("http://localhost:3001/employee")
        .then(function (response) {
            $scope.employees = response.data;
        }
        );
    $scope.removeEmp = function (id) {
        $http.delete('http://localhost:3001/removeemployee?id=' + id).then(
            function () {
                $state.reload();
            },
            function () {
                console.log("error");
            });
    }
    $scope.searchValue = "";
    $scope.search = function () {
        $http.get("http://localhost:3001/employee?lastName=" + $scope.searchValue)
            .then(function (response) {
                $scope.employees = response.data;
            }
            );
    }
});
app.controller('employeeViewController', function ($scope, $http, $stateParams) {
    $http.get("http://localhost:3001/employee?id=" + $stateParams.id)
        .then(function (response) {
            $scope.viewEmployee = response.data[0];
        }
        );
});
app.controller('employeeAddController', function ($scope, $http, $window) {
    $http.get("http://localhost:3001/employee")
        .then(function (response) {
            $scope.super = response.data;
        }
        );
    $scope.addEmployee = function () {
        $http({
            url: 'http://localhost:3001/addemployee',
            method: "POST",
            data: { "empSupervisor": $scope.supervisor.EMPID, "empFirstName": $scope.firstName, "empLastName": $scope.lastName, "empGender": $scope.gender, "empAddress": $scope.address, "empSalary": $scope.salary, "empPosition": $scope.position, "empDepartment": $scope.department }
        })
            .then(function (response) {
                $window.location.href = '#!/home/employees';
            },
                function (response) {
                    console.log("fail");
                });
    }
});
app.controller('employeeEditController', function ($scope, $http, $stateParams, $window) {
    $scope.empId = $stateParams.id;
    $http.get("http://localhost:3001/employee?id=" + $stateParams.id)
        .then(function (response) {
            $scope.firstName = response.data[0].EMPFIRSTNAME;
            $scope.lastName = response.data[0].EMPLASTNAME;
            $scope.gender = response.data[0].EMPGENDER;
            $scope.position = response.data[0].EMPPOSITION;
            $scope.department = response.data[0].EMPDEPARTMENT;
            $scope.address = response.data[0].EMPADDRESS;
            $scope.salary = response.data[0].EMPSALARY;
            $scope.supervisor = response.data[0].SUPERVISORLASTNAME;
        }
        );
    $http.get("http://localhost:3001/employee")
        .then(function (response) {
            $scope.names = response.data;
            for (var i = 0; i < $scope.names.length; i++) {
                if ($scope.names[i].SUPERVISORLASTNAME == $scope.supervisor) {
                    $scope.superName = $scope.names[i];
                }
            }
        }
        );
    $scope.editEmployeePost = function () {
        $http({
            url: 'http://localhost:3001/editemployee',
            method: "POST",
            data: { "id": $stateParams.id, "empSupervisor": $scope.superName.EMPID, "empFirstName": $scope.firstName, "empLastName": $scope.lastName, "empGender": $scope.gender, "empAddress": $scope.address, "empSalary": $scope.salary, "empPosition": $scope.position, "empDepartment": $scope.department }
        })
            .then(function (response) {
                $window.location.href = '#!/home/employees';
            },
                function (response) {
                    console.log("fail");
                });
    }
});
app.controller('managePermissionsController', function ($scope, $http, $stateParams, $window) {
    $http.get("http://localhost:3001/employee?id=" + $stateParams.id)
    .then(function (response) {
        $scope.viewEmployee = response.data[0];
    }
    );
    $scope.editEmployeeUser = function () {
        if ($scope.hasres) {
            $scope.hasres = 1;
        } else {
            $scope.hasres = 0;
        }
        if ($scope.hasroom) {
            $scope.hasroom = 1;
        } else {
            $scope.hasroom = 0;
        }
        if ($scope.hasemp) {
            $scope.hasemp = 1;
        } else {
            $scope.hasemp = 0;
        }
        if ($scope.hasinv) {
            $scope.hasinv = 1;
        } else {
            $scope.hasinv = 0;
        }
        $http.get("http://localhost:3001/empuser?id=" + $stateParams.id)
            .then(function (response) {
                if (response.data[0] != null) {
                    $http({
                        url: 'http://localhost:3001/editempuser',
                        method: "POST",
                        data: { 'id': $stateParams.id, 'empUsername': $scope.username, 'empPassword': $scope.password, 'hasAccessReserv': $scope.hasres, 'hasAccessRoom': $scope.hasroom, 'hasAccessEmployees': $scope.hasemp, 'hasAccessFacilities': 1, 'hasAccessInventory': $scope.hasinv }
                    })
                        .then(function (response) {
                            $window.location.href = '#!/home/employees';
                        },
                            function (response) {
                                console.log("fail");
                            });
                } else {
                    $http({
                        url: 'http://localhost:3001/addempuser',
                        method: "POST",
                        data: { 'empID': $stateParams.id, 'empUserName': $scope.username, 'empPassword': $scope.password, 'hasAccessReserv': $scope.hasres, 'hasAccessRoom': $scope.hasroom, 'hasAccessEmployees': $scope.hasemp, 'hasAccessFacilities': 1, 'hasAccessInventory': $scope.hasinv }
                    })
                        .then(function (response) {
                            $window.location.href = '#!/home/employees';
                        },
                            function (response) {
                                console.log("fail");
                            });
                }
            });
    }
});