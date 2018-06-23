app.controller('roomTypeAddController', function ($scope, $http, $window) {
    $scope.addRoomType = function () {
        $http({
            url: 'http://localhost:3001/addroomtype',
            method: "POST",
            data: { "roomTypeName": $scope.roomTypeName, "roomMaxCapacity": $scope.roomMaxCapacity, "roomTypeDescription": $scope.roomTypeDescription }
        })
            .then(function (response) {
                $window.location.href = '#!/home/manageRoomType';
            },
                function (response) {
                    console.log("fail");
                });
    }
});
app.controller('roomTypeManageController', function ($scope, $http, $state) {
    $http.get("http://localhost:3001/roomtype")
        .then(function (response) {
            $scope.types = response.data;
        }
        );
    $scope.deleteType = function (id) {
        $http.delete('http://localhost:3001/removeroomtype?id=' + id).then(
            function () {
                $state.reload();
            },
            function () {
                console.log("error");
            });
    }
});
app.controller('roomAddController', function ($scope, $http, $window) {
    $http.get("http://localhost:3001/roomtype")
        .then(function (response) {
            $scope.types = response.data;
        }
        );
    $scope.roomStatus = "Available";
    $scope.locationList = ['Roof', 'Beach view', 'Pool view', 'Street view', 'Landscape view'];
    $scope.addRoom = function () {
        if ($scope.smokingStatus) {
            $scope.smokingStatus = 1;
        } else {
            $scope.smokingStatus = 0;
        }
        if ($scope.hasBalcony) {
            $scope.hasBalcony = 1;
        } else {
            $scope.hasBalcony = 0;
        } if ($scope.hasInternet) {
            $scope.hasInternet = 1;
        } else {
            $scope.hasInternet = 0;
        } if ($scope.hasSafe) {
            $scope.hasSafe = 1;
        } else {
            $scope.hasSafe = 0;
        } if ($scope.hasMiniBar) {
            $scope.hasMiniBar = 1;
        } else {
            $scope.hasMiniBar = 0;
        } if ($scope.hasBathTub) {
            $scope.hasBathTub = 1;
        } else {
            $scope.hasBathTub = 0;
        }
        $http({
            url: 'http://localhost:3001/addroom',
            method: "POST",
            data: {
                "roomNum": $scope.roomNum, "roomTypeID": $scope.roomTypeName.ROOMTYPEID, "roomLocation": $scope.roomLocation, "roomStatus": $scope.roomStatus, "smokingStatus": $scope.smokingStatus, "hasBalcony": $scope.hasBalcony, "hasInternet": $scope.hasInternet, "hasSafe": $scope.hasSafe, "hasMiniBar": $scope.hasMiniBar, "hasBathTub": $scope.hasBathTub, "roomDescription": $scope.roomDescription, "roomPrice": $scope.roomPrice
            }
        })
            .then(
                function (response) {
                    $window.location.href = '#!/home/room';
                },
                function (response) {
                    console.log("fail");
                });
    }
});
app.controller('roomsController', function ($scope, $http, $state) {
    $scope.currentDate = new Date();
    $http.get("http://localhost:3001/roomtype")
        .then(function (response) {
            $scope.types = response.data;
        }
        );
    $http.get("http://localhost:3001/room")
        .then(function (response) {
            $scope.rooms = response.data;
            $http.get("http://localhost:3001/reservationavailable")
                .then(function (response) {
                    $scope.reservations = response.data;
                    for (var i = 0; i < $scope.rooms.length; i++) {
                        for (var j = 0; j < $scope.reservations.length; j++) {
                            if ($scope.reservations[j].ROOMNUM == $scope.rooms[i].ROOMNUM) {
                                $http({
                                    url: 'http://localhost:3001/makeavailable',
                                    method: "POST",
                                    data: {
                                        "roomNum": $scope.reservations[j].ROOMNUM, "roomStatus": "Occupied"
                                    }
                                })
                            }
                        }
                    }
                }
                );
        }
        );
    $scope.removeRoom = function (id) {
        $http.delete('http://localhost:3001/removeroom?id=' + id).then(
            function () {
                $state.reload();
            },
            function () {
                console.log("error");
            });
    }
    $scope.searchA = function () {
        $http.get("http://localhost:3001/room?roomNum=" + $scope.searchValue)
            .then(function (response) {
                $scope.rooms = response.data;
            }
            );
    }
    $scope.searchB = function () {
        if (document.getElementById('option1').checked) {
            $scope.status = "Available";
        } else if (document.getElementById('option2').checked) {
            $scope.status = "Occupied";
        }
        $http.get("http://localhost:3001/room?roomStatus=" + $scope.status + "&roomTypeID=" + $scope.roomTypeName.ROOMTYPEID)
            .then(function (response) {
                $scope.rooms = response.data;
            }
            );
    }
});
app.controller('roomViewController', function ($scope, $http, $stateParams) {
    $http.get("http://localhost:3001/room?id=" + $stateParams.id)
        .then(function (response) {
            $scope.viewRoom = response.data[0];
            if ($scope.viewRoom.SMOKINGSTATUS === 1) {
                $scope.smoking = true;
            } else {
                $scope.smoking = false;
            }
            if ($scope.viewRoom.HASBALCONY === 1) {
                $scope.balcony = true;
            } else {
                $scope.balcony = false;
            }
            if ($scope.viewRoom.HASINTERNET === 1) {
                $scope.internet = true;
            } else {
                $scope.internet = false;
            }
            if ($scope.viewRoom.HASSAFE === 1) {
                $scope.safe = true;
            } else {
                $scope.safe = false;
            }
            if ($scope.viewRoom.HASMINIBAR === 1) {
                $scope.minibar = true;
            } else {
                $scope.minibar = false;
            }
            if ($scope.viewRoom.HASBATHTUB === 1) {
                $scope.tub = true;
            } else {
                $scope.tub = false;
            }
        }
        );
});

app.controller('roomEditController', function ($scope, $http, $stateParams, $window) {
    $http.get("http://localhost:3001/room?id=" + $stateParams.id)
        .then(function (response) {
            $scope.roomTypeID = response.data[0].ROOMTYPEID;
            $scope.roomTypeName = response.data[0].ROOMTYPENAME;
            $scope.roomLocation = response.data[0].ROOMLOCATION;
            $scope.roomStatus = response.data[0].ROOMSTATUS;
            $scope.smokingStatus = response.data[0].SMOKINGSTATUS ? true : false;
            $scope.hasBalcony = response.data[0].HASBALCONY ? true : false;
            $scope.hasInternet = response.data[0].HASINTERNET ? true : false;
            $scope.hasSafe = response.data[0].HASSAFE ? true : false;
            $scope.hasMiniBar = response.data[0].HASMINIBAR ? true : false;
            $scope.hasBathTub = response.data[0].HASBATHTUB ? true : false;
            $scope.roomDescription = response.data[0].ROOMDESCRIPTION;
            $scope.roomPrice = response.data[0].ROOMPRICE;
            $scope.roomNum = response.data[0].ROOMNUM;
        }
        );
    $http.get("http://localhost:3001/roomtype")
        .then(function (response) {
            $scope.types = response.data;
            for (var i = 0; i < $scope.types.length; i++) {
                if ($scope.types[i].ROOMTYPENAME == $scope.roomTypeName) {
                    $scope.roomTypeName = $scope.types[i];
                }
            }
        }
        );
    $scope.locationList = ['Roof', 'Beach view', 'Pool view', 'Street view', 'Landscape view'];
    $scope.statusList = ['Available', 'Occupied'];
    $scope.editRoomPost = function () {
        $scope.smokingStatus = $scope.smokingStatus ? 1 : 0;
        $scope.hasBalcony = $scope.hasBalcony ? 1 : 0;
        $scope.hasInternet = $scope.hasInternet ? 1 : 0;
        $scope.hasSafe = $scope.hasSafe ? 1 : 0;
        $scope.hasMiniBar = $scope.hasMiniBar ? 1 : 0;
        $scope.hasBathTub = $scope.hasBathTub ? 1 : 0;
        $http({
            url: 'http://localhost:3001/editroom',
            method: "POST",
            data: { "roomNum": $scope.roomNum, "roomTypeID": $scope.roomTypeName.ROOMTYPEID, "roomLocation": $scope.roomLocation, "roomStatus": $scope.roomStatus, "smokingStatus": $scope.smokingStatus, "hasBalcony": $scope.hasBalcony, "hasInternet": $scope.hasInternet, "hasSafe": $scope.hasSafe, "hasMiniBar": $scope.hasMiniBar, "hasBathTub": $scope.hasBathTub, "roomDescription": $scope.roomDescription, "roomPrice": $scope.roomPrice }
        })
            .then(function (response) {
                $window.location.href = '#!/home/room';
            },
                function (response) {
                    console.log("fail");
                });
    }
});